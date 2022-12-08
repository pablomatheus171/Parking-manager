import DatabaseJson from './database-json'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
jest.mock('uuid', () => ({ v4: () => 'testId' }))

const item = {
  id: uuidv4(),
  name: 'any_name',
  email: 'any_email',
  created_at: dayjs().format('ddd, MMM D, YYYY h:mm A')
}

describe('DatabaseJson', () => {
  afterEach(async () => {
    await new DatabaseJson('test').clear()
  })
  test('should save item in json', async () => {
    const sut = new DatabaseJson('test')

    const result = await sut.save(item)
    expect(result).toEqual(item)
  })
  test('should not save if item already exists', async () => {
    const sut = new DatabaseJson('test')
    await sut.save(item)
    const result = await sut.save(item)
    expect(result).toEqual(new Error('item already exists !'))
  })
  test('should update item by id', async () => {
    const sut = new DatabaseJson('test')
    await sut.save(item)
    const result = await sut.update(item.id, { name: 'pablo' })

    expect(result).toEqual({
      id: uuidv4(),
      name: 'pablo',
      email: 'any_email',
      created_at: dayjs().format('ddd, MMM D, YYYY h:mm A')
    })
  })
})
