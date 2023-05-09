project 1

----- Installing React only -----
npm create vite
cd React
npm install

npm install react-router-dom -S
npm install bootstrap@5.3.0-alpha3
npm i bootstrap-icons
npm install -S axios

npm run dev

# компиляция sass:
npx sass --watch src/scss:src/compiled_scss //compile directory to directory

# use it!
npx sass --watch src/scss/App.scss src/scss/compiled/App.css	
# npx sass --watch input.scss output.css	

https://youtu.be/qJq9ZMB2Was?t=7601