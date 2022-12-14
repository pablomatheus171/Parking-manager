import Controller from '../../protocols/controller'
import Validation from '../../protocols/validation'
import UseCase from '../../protocols/use-case'
import ClientRequest from '../../helpers/client-request'
import ServerResponse from '../../helpers/server-response'

export default class RegisterVehicleController implements Controller {
  constructor (private readonly validation: Validation,
    private readonly registerVehicleUseCase: UseCase) {}

  async handle (clientRequest: ClientRequest): Promise<ServerResponse> {
    try {
      const error = this.validation.validate(clientRequest.request)
      if (error) {
        return {
          status: 400,
          response: error.message
        }
      }

      const ticket = await this.registerVehicleUseCase.execute(clientRequest.request)
      if (!ticket) {
        throw new Error()
      } else {
        return {
          status: 201,
          response: ticket
        }
      }
    } catch {
      return {
        status: 500,
        response: 'Internal Error'
      }
    }
  }
}
