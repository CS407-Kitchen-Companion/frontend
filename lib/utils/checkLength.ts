export enum ComparisonType {
  BIGGER = 'BIGGER',
  SMALLER = 'SMALLER',
  EQUAL = 'EQUAL',
}

interface checkLengthProps {
  string: string
  length: number
  comparisonType: ComparisonType
}

export function checkLength({ string, length, comparisonType }: checkLengthProps) {
  switch (comparisonType) {
    case 'BIGGER':
      return string.length > length
    case 'SMALLER':
      return string.length < length
    case 'EQUAL':
    default:
      return string.length === length
  }
}
