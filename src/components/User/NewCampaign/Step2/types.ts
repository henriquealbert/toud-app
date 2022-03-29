export type FormStep2Values = {
  hasDescription: 'Yes' | 'No'
  description: string
  userId: string
  filesIds: Array<{ id: string }>
  expectedDate: Date | undefined
}
