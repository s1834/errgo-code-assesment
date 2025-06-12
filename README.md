# Errgo Code Assessment
This repo contains two directories:
1. Backend
2. Frontend

There are multiple `TODO`s scattered across both directories. The goal is to complete the TODOs to implement a full round trip scenario to populate and display the data on the front end. It's recommended to start with the `Frontend` directory to get a better understanding of the project and to help determine the necessary code to be added in the `Backend` directory.

Work will be graded taking into account the following aspects:
- Clean code
- Conciseness of solution
- TSDoc

Please read the respective `README.md` files found in each directory for more details.

# Highly Visibile Bonus Task (Optional)
Implement a chat system utilizing web sockets on both frontend and backend. This should just be a simple system where multiple users can chat to one another on one single session.
- For the frontend, create a new page and route to the page `/chat`
  - Bare minimum design, you dont need to show user names, just a new line for each message
  - Simple text field and send button
- No need to implement multiple rooms/sessions
- Utilize the web socket node package for backend and the client web socket for front end
- Messages should be displaying live
- Store the state of the chat on the backend (will be destroyed upon server restart/shut down)

# Submission
For submission, please upload your solution as a private repository on your GitHub profile and share it with `errgo.project@gmail.com`
