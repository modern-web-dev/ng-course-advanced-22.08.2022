export const errorToMessage = (errorKey: string, errorData: any) => {
  switch(errorKey) {
    case 'required':
      return 'Value for this field is required';
    case 'maxlength':
      return `Value fot this field is ${errorData.actualLength} which exceeds ${errorData.requiredLength} limit.`;
  }
  return `Not supported error: ${errorKey}`;
};
