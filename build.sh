echo Performing client build
#Get client build
cd src/client/src
npm install
bower install
bower update
gulp build
cd ..
cd ..
cd ..


echo Performing server build
cd src/server
npm install
cd ..
cd ..

echo Performing deployment
gulp build

echo Performing the failing run of the application
cd ./build
echo This will fail
node index.js
echo See, It will work now

echo ------------------------------------------------------------$
echo DONE
echo You may now sort the certs out, drop in a custom config and $
echo run "cd ./build" & "node index.js" to make things go

