# Project-group02-TDDD83

## Git Workflow
![The workflow we will use in Git](/git_workflow.jpg "Git workflow")

**Main** should only be used for final versions of the application. With other words should only 100% bug free versions be merged into this branch.

**Release** is used to test the application as well as fix **minor** bugs if any exists.

**Develop** is the branch where to whom all the features we develop merges to. Just like the main branch, we do not change any code in the develop branch. This branch is supposed to be stable and work without any major bugs, however, some smaller bugs are acceptable.

**Feature** branches are where most of the development and programming is made. For **every** new feature we decide to implement a new feature branch has to be created. When a feature is considered done, that specific feature branch should be merged with the develop branch.


## The Git Dance
A good way to work in general.

1. git pull: get the latest changes from the server.

2. git status: See what changes have been made and what hasn't been commited. 

3. git add: Add what changes to be commited/saved.

4. git commit: Commit changes/save to your local repository.

5. git push: upload the changes to the server.

6. git pull: get the latest changes from the server. 

 


## Setting Up the Environment on Your Own Computer
Firstly, you need to make sure Python, Visual Studio Code and PostgreSQL is installed on your computer. There is plenty of guides online if you are unsure how to do this.

Secondly, you need to create a map on your own computer where you want to store the project locally. This does not matter where, just make sure it easy accesable for you.

Thirdly, you need to enter this map (directory) through a terminal. You can use for instance Windows Powershell (pre-installed) if you have a PC. You open directories in the terminal by using the command:
```
cd <"path to directory">
```

When you have entered your wished directory its time to clone the repository from Gitlab to your computer. Use the command found in [Cloning Repository with SSH Key](#cloning-repository-with-ssh-key).

When the repository has been cloned to your computer you need to go to the directory called "project". You enter this directory by writing:
```
cd project
```

Now it's time to install a virtual environment to you the project. Run the following command to create a virtual environment called venv:
```
python -m venv venv
```

When the virtual environment has been created it's time to install some packages to the virtual environment:
```
pipenv install flask
pipenv install flask_sqlalchemy
pipenv install flask-bcrypt
pipenv install flask-jwt-extended
```
**Note:** If you are using Mac the command to install psycopg2 is instead **pipenv install psycopg2-binary**

One command to activate the virtual environment is:
```
pipenv shell 

```
Or go into the server and write 
```
source venv/bin/activate
```
To exit the virtuall environment you can at any time write "exit" in the terminal.

## Commonly Used Git Commands

### Cloning Repository with SSH Key
```
cd <existing_repo>
git clone git@gitlab.liu.se:tddc88-2022/c3/project.git
```
If you are going to work from your own computer you need to pair an SSH key between your computer and your Gitlab account. Google it to find instructions on how to do this. If you work from the computer owned by IDA this is often not neccessary. 

```
git config --global user.name [liu-id]
git config --global user.email [liu email]
```
After you have cloned the repository to your own workspace it can be good to set the global user so it matches the user added to the Gitlab repository, i.e. your liu account. Otherwise, you wont be able to push any changes to the repository and it will complain that the author is not a member of the team.

If you have commited changes with the wrong author already, you can follow the steps in this thread on StackOverflow, https://stackoverflow.com/questions/56177751/git-push-failed-with-error-gitlab-author-not-member-of-team, where you basically remove the old commits and make new ones with the correct author instead.

### Day-To-Day Work
```
git status
```
Displays the status of your working directory. Options include new, staged, and modified files. It will retrieve branch name, current commit identifier, and changes pending commit.

```
 git add [file]
```
Add a file to the **staging** area. Use in place of the full file path to add all changed files from the **current directory** down into the **directory tree**.

```
git log
```
See history of changes.
```
git diff [file]
```
Show changes between **working directory** and **staging area**.

```
git diff --staged [file]
```
Shows any changes between the **staging area** and the **repository**.

```
git reset [file]
```
Revert your **repository** to a previous known working state.

```
git stash
```
Discard/put away local changes. You can use git stash pop to release the stored changes.

```
git commit -m "Your message."
```
Create a new **commit** from changes added to the **staging area**. The **commit** must have a message!


### Pulling
```
git pull 
```
Fetch changes.

### Pushing
```
git push
```
Push changes

### Branching
```
git branch [-a]
```
List all local branches in repository. With **-a**: show all branches
(with remote).

```
git branch [branch_name]
```
Create new branch, referencing the current **HEAD**.

```
git checkout [-b][branch_name]
```
Switch **working directory** to the specified branch. With **-b**: Git will create the specified branch if it does not exist.

```
git branch -d [name]
```
Remove selected branch, if it is already merged into any other. **-D** instead of **-d** forces deletion.

```
git push origin --delete [name]

```

Remove selected brach from origin.

### Merging
```
git merge [from name]
```
Join specified **[from name]** branch into your current branch (the one you are on currently).

#### Good merging process
1. Done with my functionality in my feature branch.
2. git add: Add my changed files.
3. git commit: Writes a clear commit message.
4. git checkout development: Switch to development branch.
5. git pull: Fetch changes made in development branch to assure I have the current changes (avoid merge conflict in the future).
6. git checkout *my branch*: Swith to your feature branch.
7. git merge development: Merge development into my branch and fix merge conflicts in feature branch to have latest changes in development and merge them with the functionality developed in the feature branch.
8. Fix merge conflicts in the feature branch before mergeing into development. 
9. git checkout development: Switch to development branch.
10. git merge *my branch*: Merge your changes from your feature branch into the development branch. 
11. git push: Push the changes

## Guidelines
For such a big project with many individuals involved it is of importance that we have som guidelines.
- Create a new branch for every new feature.
- Commit changes too often rather than too seldom.
- When a feature branch has been merged into the develop-branch, the old feature branch should be deleted.
- Always commit with a message. 
   - State why you are making the change.
   - Focus on the way it worked before the change (and what was wrong with that), the way it works now, and why you decided to solve it the way you did. 
   - Explain the side effects of the change if any. 
   - Keep the messages short but informal; rule-of-thumb, if the messages are too long you probably do not commit often enough.
- When taking on a new assignment, make sure you update the Kanban cards in Trello accordingly.
- Mark an issue as "Closed" in Trello upon completing it.
