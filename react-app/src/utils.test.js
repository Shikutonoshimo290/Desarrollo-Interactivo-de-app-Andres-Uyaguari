import { describe, it, expect } from 'vitest'
import { filtrarPorNombre } from './utils'

describe('filtrarPorNombre', () => {
  const users = [{ name: 'Leanne Graham' }, { name: 'Ervin Howell' }]

  it('filtra ignorando mayusculas', () => {
    expect(filtrarPorNombre(users, 'ERVIN')).toEqual([{ name: 'Ervin Howell' }])
  })
})