function sendMessage() {
  var userInput = document.getElementById("user-input").value;
  if (userInput !== "") {
    var chatBox = document.getElementById("chat-box");
    var userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);
    
    // Call the Gemini API to generate content
    fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDYrln6IBZRDCSKp9iIIf31SFSW3O5C2t0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: userInput }]
        }]
      })
    })
    .then(response => response.json())
    .then(data => {
      var botMessage = document.createElement("div");
      botMessage.className = "chat-message bot";
      botMessage.textContent = data.contents[0].parts[0].text; // Assuming the API returns the generated content
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