// This function checks various types of values to determine if they are empty, helping to prevent unexpected behavior, especially when handling data or user inputs
export const isEmpty = (value) => {
  return (
    // Check if the value is `undefined`
    value === undefined || 
    
    // Check if the value is `null`
    value === null || 
    
    // Check if the value is an object with no properties
    (typeof value === "object" && Object.keys(value).length === 0) || 
    
    // Check if the value is a string that is either empty or consists only of whitespace
    (typeof value === "string" && value.trim().length === 0)
  );
};
