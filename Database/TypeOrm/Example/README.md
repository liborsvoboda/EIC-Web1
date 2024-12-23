# Example how to use TypeORM with TypeScript in the browser

1. clone repository 
2. run `npm i`
3. run `npm run build`
4. run `npm start`
5. open site in the browser (`http://localhost:3000`)
6. open your web developer console and take a look what queries are executed and what data is persisted

# Screenshots

Logs from your console:

![typeorm-browser-console](./resources/web-console.png)

Browser shows basic output:
![typeorm-browser](./resources/web-browser.PNG)


# Generate Model from Database

````   

 npx typeorm-model-generator -d ".\database.db" -e sqlite -o .

npm install typeorm-model-generator --save --force
npm install routing-controllers --save  --force
npm install typeorm-routing-controllers-extensions --save --force  

typeorm-model-generator -d typeorm_mg --namingStrategy=./NamingStrategy -e sqlite -db /tmp/sqliteto.db


 
````  

