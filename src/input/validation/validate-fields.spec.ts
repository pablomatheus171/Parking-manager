import Validation from '../protocols/validation'

class ValidateFields implements Validation {
  validate (input: any): Error | null {
    const requiredFields = [
      'name',
      'driver',
      'model',
      'licensePlate',
      'type']

    for (const field of requiredFields) {
      if (!input[field]) {
        return new Error('fill in all fields !')
      }
    }
    return null
  }
}

describe('Validate Fields', () => {
  test('should return an error if name is not provided', () => {
    const sut = new ValidateFields()

    const request = {
      driver: 'any_driver',
      model: 'any_model',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }

    const result = sut.validate(request)
    expect(result).toEqual(new Error('fill in all fields !'))
  })
  test('should return an error if name is not provided', () => {
    const sut = new ValidateFields()

    const request = {}

    const result = sut.validate(request)
    expect(result).toEqual(new Error('fill in all fields !'))
  })
})