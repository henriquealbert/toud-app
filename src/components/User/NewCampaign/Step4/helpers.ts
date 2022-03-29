import { format, parseISO } from 'date-fns'

export const formatReviewData = (data: any) => {
  return [
    {
      text: 'Nome da campanha',
      value: data?.name
    },
    {
      text: 'Gênero do público',
      value:
        data?.gender === 'BOTH'
          ? 'Masculino; Feminino.'
          : data?.gender === 'FEMALE'
          ? 'Feminino'
          : 'Masculino'
    },
    {
      text: 'Canal de veiculação',
      value: 'Instagram stories' // FIXED PLACEMENT
    },
    {
      text: 'Alcance estimado',
      value: data?.estimatedReach || ''
    },
    {
      text: 'Segmento',
      value: data?.activity.name
    },
    {
      text: 'Data prevista de veiculação',
      value: format(parseISO(data?.expectedDate || new Date().toISOString()), 'dd/MM/yyyy')
    },
    {
      text: 'Valor investido',
      value: parseFloat(data?.amount)?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    },
    {
      text: 'Localização',
      value: data?.location === 'BR' ? 'Brasil todo' : data?.location
    }
  ]
}
