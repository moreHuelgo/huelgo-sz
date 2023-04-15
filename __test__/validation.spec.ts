import { szModel, szParam } from '../src/index'

describe('validation test', () => {
  it('[TEST] Serealize & Deserialize Test', (done) => {
    const leedonggyu = {
      dongguy_job: 'programmer',
      donggyu_name: 'my name is leeodnggyu',
      donggyu_age: 28,
    }

    const result = szModel({
      job: szParam().set(leedonggyu.dongguy_job, 'donggyu_job').string(),
      name: szParam().set(leedonggyu.donggyu_name, 'donggyu_name').string(),
      age: szParam().set(leedonggyu.donggyu_age, 'donggyu_age').number(),
    })

    const seModel = result.getSerialize() as any
    expect(seModel.job).toBe('programmer')
    expect(seModel.name).toBe('my name is leeodnggyu')
    expect(seModel.age).toBe(28)

    const deseModel = result.getDeserialize() as any
    expect(deseModel.donggyu_job).toBe('programmer')
    expect(deseModel.donggyu_name).toBe('my name is leeodnggyu')
    expect(deseModel.donggyu_age).toBe(28)
    done()
  })

  it('[TEST] validation `not string type`', (done) => {
    const model = szModel({
      employeeKey: szParam().set(null, 'employee_key').string().required(),
    })

    const { data, error } = model.validate()
    expect(data).toMatchObject({
      employeeKey: null,
    })
    expect(error.length).toBeGreaterThan(1)
    done()
  })

  it('[TEST] validtion `not int type`', (done) => {
    const model = szModel({
      myAge: szParam().set('10', 'my_age').number().required(),
    })

    const { data, error } = model.validate()

    expect(data).toMatchObject({
      myAge: '10',
    })
    expect(error.length).toBe(1)
    done()
  })

  it('[TEST] validation `when option`', (done) => {
    const params = {
      myTag: 'join',
      email: null,
    }

    const model = szModel({
      myTag: szParam().set(params.myTag, 'my_tag').required(),
      email: szParam().set(params.email, 'email').whenOptional(params.myTag),
    })

    const { error } = model.validate()
    expect(error.length).toBe(1)
    done()
  })

  it('[TEST] validation `include`', (done) => {
    const model = szModel({
      myTag: szParam().set('logout', 'my_tag').include(['join', 'login', 'email']).required(),
    })

    const { error } = model.validate()
    expect(error[0]).toBe('my_tag is not include "join,login,email}"')

    done()
  })
})
