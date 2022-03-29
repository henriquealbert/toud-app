import yup from 'lib/yup'

export const step3Schema = yup.object().shape({
  amount: yup.string().required('Campo obrigatório')
})

export const parseValue = (value: string) => {
  return +Number(value.replace('R$', '').replace('.', '').replace(',', '.')).toFixed(2)
}

export const getCurrentAudience = (value: string) => {
  const parsedValue = parseValue(value)
  return texts.find((text) => parsedValue >= text.min && parsedValue <= text.max)
}

const texts = [
  {
    text: () => (
      <span>
        Coloque um valor superior ou igual a R$250,00 para visualizar a estimativa de alcance da sua
        publi.
      </span>
    ),
    min: 0,
    max: 249.99,
    width: '0px'
  },
  {
    text: () => (
      <span>
        Com esse valor, a estimativa é que sua publi seja divulgada por mais de{' '}
        <strong>3 influencers</strong> e que ela alcance de{' '}
        <strong>30.000 mil à 50.000 mil usuários reais.</strong>
      </span>
    ),
    min: 250,
    max: 499.99,
    width: '210px'
  },
  {
    text: () => (
      <span>
        Com esse valor, a estimativa é que sua publi seja divulgada por mais de{' '}
        <strong>5 influencers</strong> e que ela alcance de{' '}
        <strong>60.000 mil à 80.000 mil usuários reais.</strong>
      </span>
    ),
    min: 500,
    max: 699.99,
    width: '420px'
  },
  {
    text: () => (
      <span>
        Com esse valor, a estimativa é que sua publi seja divulgada por mais de{' '}
        <strong>8 influencers</strong> e que ela alcance de{' '}
        <strong>90.000 mil à 120.000 mil usuários reais.</strong>
      </span>
    ),
    min: 700,
    max: 999.99,
    width: '525px'
  },
  {
    text: () => (
      <span>
        Com esse valor, a estimativa é que sua publi seja divulgada por mais de{' '}
        <strong>10 influencers</strong> e que ela alcance de{' '}
        <strong>130.000 mil à 150.000 mil usuários reais.</strong>
      </span>
    ),
    min: 1000,
    max: 1199.99,
    width: '630px'
  },
  {
    text: () => (
      <span>
        Com esse valor, a estimativa é que sua publi seja divulgada por mais de{' '}
        <strong>15 influencers</strong> e que ela alcance de{' '}
        <strong>160.000 mil à 180.000 mil usuários reais.</strong>
      </span>
    ),
    min: 1200,
    max: 1499.99,
    width: '735px'
  },
  {
    text: () => (
      <span>
        Com esse valor, a estimativa é que sua publi seja divulgada por mais de{' '}
        <strong>20 influencers</strong> e que ela alcance de{' '}
        <strong>190.000 mil à 210.000 mil usuários reais.</strong>
      </span>
    ),
    min: 1500,
    max: Infinity,
    width: '840px'
  }
]
