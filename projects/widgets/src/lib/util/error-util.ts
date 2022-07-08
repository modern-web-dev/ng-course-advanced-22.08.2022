export const errorToMessage = (errorKey: string, fieldName: string, errorData: any) => {
  switch(errorKey) {
    case 'required':
      return `Value for ${fieldName} field is required.`;
    case 'maxlength':
      return `Value for ${fieldName} field is ${errorData.actualLength} which exceeds ${errorData.requiredLength} limit.`;
    case 'max':
      return `Value for ${fieldName} must be not higher than ${errorData.max}.`;
    case 'min':
      return `Value for ${fieldName} must be not lower than ${errorData.min}.`;
  }
  return `Not supported error: ${errorKey}`;
};
