export const errorToMessage = (errorKey: string, fieldName: string, errorData: any) => {
  switch(errorKey) {
    case 'required':
      return `Value for ${fieldName} field is required.`;
    case 'maxlength':
      return `Value for ${fieldName} field is ${errorData.actualLength} which exceeds ${errorData.requiredLength} limit.`;
  }
  return `Not supported error: ${errorKey}`;
};
