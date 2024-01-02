# Your Express App Name

Welcome to Company Report Generator. This is a Node.js Express application

## Getting Started
Follow these steps to set up and run the application locally.


### 1. Prerequisites:
- Make sure you have [Node.js](https://nodejs.org/) version 18 and above installed on your machine.
- Optionally, you may use a package manager like npm (Node Package Manager).
- graphicsmagick
- ghostscript
#####Don't have graphicsmagick and ghostscript yet?
#####Follow [this guide](https://github.com/yakovmeister/pdf2image/blob/HEAD/docs/gm-installation.md) to install the required dependencies.


### 2. Installation
1. Clone the repository:
```bash
   git clone https://github.com/Elvis-Sarfo/sample-test.git
```
2. Navigate to the project directory:
```bash
cd sample-test
```

3. Install dependencies
```bash
npm install
```

### 3. Configuration
1. Create a `.env` file in the root of the project
```bash
HF_ACCESS_TOKEN = 'HUGGING_FACE_ACCESS_TOKEN'
OPEN_AI_KEY = 'OPENAI_API_KEY'
GOOGLE_AI_KEY = 'GOOGLE_AI_KEY'
```
The following are guides to to get the API Keys.
- Guide to get HUGGINGFACE ACCESS TOKEN (https://huggingface.co/docs/hub/security-tokens#what-are-user-access-tokens)
- Guide to get OPENAI API KEY (https://platform.openai.com/api-keys)
- Guide to get GOOGLE AI KEY (https://ai.google.dev/tutorials/setup)

### 4. Run the App
Start the application by entering the following in your terminal
```bash
npm start
```
The app will be running at http://localhost:3000

### 5. Test the App
Open your web browser and go to http://localhost:3000 (or the specified port). You should see the application running. Upload a company file and test the result.
#### Note: 
Make sure you internet access while testing