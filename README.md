# EatPreyLuv
# Install list:
- Git: https://git-scm.com/downloads
- MySQL 8.0.32: https://dev.mysql.com/downloads/file/?id=516927
- MySQL Workbench 8.0.32: https://dev.mysql.com/downloads/workbench/
- JDK 17: https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html#license-lightbox
  - You may need to create an Oracle account for this download. It will ask for Company name and Job title, I just put UTSA and Student. Doesn't matter what you put.
  - The version you want is JDK 17. Probably Windows x64
- IDE for Springboot (I am using IntelliJ, same IDE Amigoscode uses in his videos. Eclipse can also be used): https://www.jetbrains.com/idea/download/#section=windows
   - Download the Community edition as it is free
- Node.js: https://nodejs.org/en/download/

# How to connect to the database using MySQL Workbench
1. In MySQL Workbench open press the (+) button
2. Under hostname, input "eatpreyluv.cgtxdhomlzt6.us-east-2.rds.amazonaws.com"
3. Port is "3306"
4. Username is "admin"
5. Click "Store in vault" for the password and enter "PIQtdPNnMSN01ehmrqzV"
6. Click "Test Connection" to make sure everything is right. Then you can close and enter the database by clicking the new connection

# How to use Git with this project:
- With this project using Git, you will be using your command terminal. To open your command terminal, simply press "Win + r" and type in "cmd"
- From here, you need to decide the best place to put the project on your PC. I simply put mine in the first folder my command terminal takes me to.
- If you don't know how to navigate through the command terminal, Google or ChatGPT will be your friend here.
- The basics are:
  - "cd [folder name]" will move your location to the folder.
  - "dir" will list all directories in the folder
  - "cd .." will take you back one directory
 
# As long as you have Git installed on your PC, you should be able to use every command necessary to not only add the project to your PC, but to commit changes to the repository for everyone to see. 
# There are 3 things you need to know:
1. How to put the repository on your PC
- This is simple, just direct your command terminal to the folder you want to put the project in and type "git clone https://github.com/rph2002/EatPreyLuv.git"
2. How to upload changes done in the repository since you last worked on it
- In the folder with the git repository, simply type "git pull origin master"
3. How to upload changes you've committed to the repository
- In the folder with the git repository, type "git status" to see any changes done
- Then type "git add ." to add all changes you've done to the repository to github. If you only want to submit specific changes done like changes to one file, then type "git add [filename]"
- Next, type "git commit -m "[message explaining changes]"
- Finally, type "git push" and all of your changes will be uploaded to github.
# **IMPORTANT** 
- **ALWAYS PULL CHANGES FROM THE REPOSITORY BEFORE WORKING ON THE PROJECT**
- **WE DO NOT WANT TO ACCIDENTALLY DELETE SOMEONE ELSE'S CODE**
- **COMMIT CHANGES AS MUCH AS YOU CAN INCASE SOMEONE IS TRYING TO WORK ON THE PROJECT AT THE SAME TIME**
- **IT MIGHT BE BEST TO SPECIFICALLY PUSH COMMITS DONE TO YOUR SPECIFIC FILES/FOLDERS(front end folder and back end folder TO AVOID CONFLICTS**
- **CREATE A BACKUP OF EVERYTHING YOU WORKED ON BEFORE PULLING AND PUSHING**

# How to launch the project in React and Springboot
1. **Springboot**
- With the project cloned on your system, inside of IntelliJ, click Open or File->Open
  - Head to the directory with the repo in it and Drill down to:
   - *EatPreyLuv -> Back-End -> EatPreyLuv*  
   - Select it and then Click **OK**
- All of the dependencies should instantly download, 
- But in order to correctly run the project, go to _File -> Project Structure_ 
  - Make sure your SDK is set to 17 (IntelliJ should automatically detect 17 when you select the drop down if you downloaded JDK 17)
  - To Open the Project Structure Box:
   - Press: Ctrl+Alt+Shift+S
   - **OR**: Open _File -> Project Structure_
    - Check the **SDK:** box for *corretto-17 Amazon Corretto version 17.0.6*  
    - Click **Apply** if you changed it
    - Click **OK**   
- Finally, after some time with the dependencies downloading and selecting the correct JDK, you should now be able to open and run *EatPreyLuvApplication.java*
- To ***Run*** the application: 
  - Located at *EatPreyLuv -> src -> main -> java -> com.group5.EatPreyLuv -> EatPreyLuvApplication.java*   
    - Select it then 
      - Press: Alt+Shift+F10
      - **OR** open *Run -> Run...*  
    -  You should get a bunch of text in the console log but the main one you're looking for is going to say "Started EatPreyLuv in *x* seconds"
2. **React**  
  - ***After*** launching the Springboot app, the React app can now connect to the database  
    - The React app is extremely limited if the Springboot app is not active.  (Just basic html, nothing really going on).  
  - Open Visual Studio Code:  
    - Go to *File -> Open Folder...* and open the GitHub folder *EatPreyLuv -> Front-End -> eatpreyluv*  
    - Click **Select Folder**  
      - You may see: *"A git repository was found in the parent folders of the workspace or the open file(s). Would you like to open the repository?"*  
      - If you do see this, click: **Yes**  
    - Now open a new Visual Studio terminal:  
      - At the top of the page, click *Terminal* then *New Terminal* at the top to open a new terminal.  
      - Inside this new terminal, just simply type "npm start"  
    - This compiles the webpage and launches a new browser tab open to the URL "localhost:3000"  
  - For a login that always works:  
    - Type ***login*** (all lowercase) for email and password.  
    - **OR** create your own account and login with that  
  - The admin link takes you to where you can view, add, edit, and delete users, items, and discount codes.  
