
ECHO Performing client build
::Get client build
cd src/client/src
CALL npm install
CALL bower install
CALL bower update
CALL gulp build
cd ..
cd ..
cd ..


ECHO Performing server build
cd src/server
CALL npm install
cd ..
cd ..

ECHO Performing deployment
CALL gulp build

ECHO Performing the failing run of the application
cd ./build
ECHO This will fail
CALL node index.js
Echo SEE!^ It will work now

ECHO -------------------------------------------------------------------------------------------------------------------
ECHO DONE
ECHO You may now sort the certs out, drop in a custom config and finally
ECHO run "cd ./build" & "node index.js" to make thinks go