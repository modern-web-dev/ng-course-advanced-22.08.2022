export const errorToMessage = (errorKey: string, fieldName: string, errorData: any) => {
  switch(errorKey) {
    case 'maxlength':
      return `Value for ${fieldName} is ${errorData.actualLength} length with exceeds limit of ${errorData.requiredLength} characters.`;
    case 'minlength':
      return `Value for ${fieldName} is ${errorData.actualLength} character(s) long which is less than required minimum of ${errorData.requiredLength} characters.`;
    case 'required':
      return `Value for ${fieldName} is required.`;
    default:
      return `Not supported error for ${errorKey} on field ${fieldName}.`;
  }
};
