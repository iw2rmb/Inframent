const colors = ["#D7B76B", "#D7D76B", "#D75B6B", "#D76B97", "#6B6BD7", "#D7C76B", "#6BD7D7", "#D76B6B", "#59D76B", "#6B97D7"];



function getColorByAlphabet(letter) {
  // Ensure the letter is lowercase to handle both cases
  letter = letter.toLowerCase();
  
  // Check if the input is a valid alphabet character from 'a' to 'z'
  if (/^[a-z]$/.test(letter)) {
    // Convert the letter to a number (1-26) by subtracting the ASCII value of 'a' and adding 1
    const number = letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    
    return `${colors[(number - 1) % 10]}`;
  } else {
    return "Not a valid alphabet character";
  }
}
export default getColorByAlphabet;