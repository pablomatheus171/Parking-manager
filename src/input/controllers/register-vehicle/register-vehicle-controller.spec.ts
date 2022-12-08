import Validation from '../../protocols/validation'
import ClientRequest from '../../helpers/client-request'
import RegisterVehicleController from './register-vehicle-controller'
import UseCase from '../../protocols/use-case'
import Vehicle from '../../../domain/entities/vehicle'
import Ticket from '../../../domain/entities/ticket'

class RegisterVehicleUseCase implements UseCase {
  async execute ({ name, driver, model, licensePlate, type, id }: Vehicle): Promise<Ticket> {
    const ticket: Ticket = {
      id: 'id_ticket',
      id_vehicle: 'id_any_vehicle',
      type: 'any_type',
      licensePlate: 'XXXXX',
      created_at: 'now'
    }

    return new Promise(resolve => resolve(ticket))
  }
}

class ValidationStub implements Validation {
  validate (input: ClientRequest): any {
    return null
  }
}

const systemUnderTestFactory = (): any => {
  const registerVehicleUseCaseStub = new RegisterVehicleUseCase()
  const validationStub = new ValidationStub()
  const sut = new RegisterVehicleController(validationStub, registerVehicleUseCaseStub)
  return { sut, validationStub, registerVehicleUseCaseStub }
}

const fakeVehicle: Vehicle = {
  name: 'any_name',
  driver: 'any_driver',
  model: 'any_model',
  licensePlate: 'XXXXX',
  type: 'any_type',
  end_date: null,
  start_date: 'now'
}

describe('register vehicle controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = systemUnderTestFactory()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    await sut.handle(clientRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeVehicle)
  })
  test('should returns error if validation returns a error of validation', async () => {
    const { sut, validationStub } = systemUnderTestFactory()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    const response = await sut.handle(clientRequest)
    expect(response.status).toBe(400)
    expect(response.response).toEqual(new Error())
  })
  test('should call vehicle usecase with correct values', async () => {
    const { sut, registerVehicleUseCaseStub } = systemUnderTestFactory()
    const executeSpy = jest.spyOn(registerVehicleUseCaseStub, 'execute')

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    await sut.handle(clientRequest)
    expect(executeSpy).toHaveBeenCalledWith(fakeVehicle)
  })
  test('should returns ticket if vehicle usecase returns a ticket', async () => {
    const { sut } = systemUnderTestFactory()

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    const response = await sut.handle(clientRequest)
    expect(response.status).toBe(201)
    expect(response.response).toEqual({
      id: 'id_ticket',
      id_vehicle: 'id_any_vehicle',
      type: 'any_type',
      licensePlate: 'XXXXX',
      created_at: 'now'
    }
    )
  })
  test('should throw if vehicle use case return falsy', async () => {
    const { sut, registerVehicleUseCaseStub } = systemUnderTestFactory()
    jest.spyOn(registerVehicleUseCaseStub, 'execute').mockResolvedValueOnce(null)

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    const response = await sut.handle(clientRequest)
    expect(response.status).toBe(500)
    expect(response.response).toEqual(new Error('Error: could not create ticket!'))
  })
})
