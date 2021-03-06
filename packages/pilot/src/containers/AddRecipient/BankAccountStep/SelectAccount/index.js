import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import { replace } from 'ramda'

import {
  Button,
  CardActions,
  CardContent,
  Col,
  FormInput,
  Spacing,
  Row,
} from 'former-kit'

import accountTypes from '../../../../models/accountTypes'
import SelectAccountContent from './SelectAccountContent'
import banks from '../../../../models/banks'
import style from '../style.css'

const removeBankCode = replace(/^\d+ - /, '')

const renderDocumentNumber = (data, t) => {
  const { identification } = data
  const document = identification.documentType === 'cpf'
    ? identification.cpf
    : identification.cnpj

  return (
    <Row>
      <Col tv={2} desk={4} tablet={5} palm={8}>
        <FormInput
          disabled
          className={style.marginBottom}
          label={t('pages.add_recipient.document_owner')}
          type="text"
          onChange={val => val}
          value={document}
        />
      </Col>
    </Row>
  )
}

const SelectAccount = ({
  accounts,
  data,
  onBack,
  onCancel,
  onContinue,
  sharedData,
  t,
}) => {
  const options = accounts.map((account) => {
    const bankCode = account.bank
    const bankHasName = banks.includes(bankCode)
    let bankName

    if (bankHasName) {
      const bankNameWithCode = t(`models.bank_code.${bankCode}`)
      bankName = removeBankCode(bankNameWithCode)
    } else {
      bankName = bankCode
    }

    const agency = (account.agency_digit)
      ? `${account.agency}-${account.agency_digit}`
      : account.agency

    const number = `${account.number}-${account.number_digit}`

    return {
      name: `${account.name} - ${bankName} - ${agency} - ${number}`,
      value: account.id,
    }
  })

  const continueWithSelectedAccount = (formData) => {
    const sameId = account => account.id === formData.id
    const account = accounts.find(sameId)
    return onContinue(account)
  }

  return (
    <Form
      onSubmit={continueWithSelectedAccount}
      data={{
        id: data.id || options[0].value,
      }}
    >
      <CardContent>
        {renderDocumentNumber(sharedData, t)}
        {SelectAccountContent({
          options,
          t,
        })}
      </CardContent>
      <div className={style.paddingTop}>
        <CardActions>
          <Button
            type="button"
            onClick={onCancel}
            relevance="low"
            fill="outline"
          >
            {t('pages.add_recipient.cancel')}
          </Button>
          <Spacing />
          <Button
            type="button"
            onClick={onBack}
            fill="outline"
          >
            {t('pages.add_recipient.back')}
          </Button>
          <Button
            fill="gradient"
            type="submit"
          >
            {t('pages.add_recipient.continue')}
          </Button>
        </CardActions>
      </div>
    </Form>
  )
}

export const userAccountProps = PropTypes.shape({
  agency: PropTypes.string,
  bank: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  type: PropTypes.oneOf(accountTypes),
})

SelectAccount.propTypes = {
  accounts: PropTypes.arrayOf(userAccountProps),
  data: PropTypes.shape({
    id: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  sharedData: PropTypes.shape({}),
  t: PropTypes.func.isRequired,
}

SelectAccount.defaultProps = {
  accounts: [],
  data: {},
  sharedData: {},
}

export default SelectAccount
