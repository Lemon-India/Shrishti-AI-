function sendMessage() {
  var userInput = document.getElementById("user-input").value;
  if (userInput !== "") {
    var chatBox = document.getElementById("chat-box");
    var userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);
    
    // Call the ChatGPT API to generate content
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Replace with your API key
      },
      body: JSON.stringify({
        model: "text-davinci-003", // Specify the model you want to use
        prompt: userInput,
        max_tokens: 50 // Adjust as needed
      })
    })
    .then(response => response.json())
    .then(data => {
      var botMessage = document.createElement("div");
      botMessage.className = "chat-message bot";
      botMessage.textContent = data.choices[0].text; // Assuming the API returns the generated content
      chatBox.appendChild(botMessage);
    })
    .catch(error => {
      console.error('Error:', error);
      var errorMessage = document.createElement("div");
      errorMessage.className = "chat-message bot";
      errorMessage.textContent = "Sorry, an error occurred while processing your request.";
      chatBox.appendChild(errorMessage);
    });
    
    document.getElementById("user-input").value = "";
  }
}  
