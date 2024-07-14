import { Form, FormField, FormHeader, } from '@/types'

export const checkFormData = (form: Form) => {
  console.log('Form validation:')
  console.log(form)

  // Header
  const HeaderValid = checkHeader(form.header)

  // Fields
  const FieldsValid = checkFields(form.fields)

  console.log('HeaderValid: ', HeaderValid, 'FieldsValid: ', FieldsValid)
  return {
    IsValid: HeaderValid && FieldsValid,
    headerStatus: HeaderValid,
    fieldStatus: FieldsValid
  }
}

export const checkHeader = (header: FormHeader) => {
  // verify #1 header must have valid title
  const bHeader = !!header
  const bHeaderTitle = !!header.title
  console.log('bHeader: ', bHeader, 'bHeaderTitle: ', bHeaderTitle)

  return !!bHeader && !!bHeaderTitle
}

export const checkFields = (fields: FormField[]) => {
  console.log('Validating fields: ')
  console.log(fields)

  if (fields.length === 0) {
    return true
  }

  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i]
    if (!field.label) {
      console.log('Invalid field with id: ', field.id)

      return false
    }

    console.log(fields[i]);
  }

  return true
}
