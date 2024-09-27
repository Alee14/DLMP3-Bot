# DLAP Bot (Discord.JS Local Audio Player)

DLAP is a Discord bot that lets you play local audio tracks in your server. With DLAP, you can access your music files, and share your tunes with your friends and community. DLAP offers seamless integration with Discord, so you can enjoy your music without missing a beat.

[Translate](https://parlance.vicr123.com/projects/dlap) | [Video Tutorial](https://youtu.be/Gvva8LHjOOo) |
[Support Server](https://discord.gg/EFhRDqG)

If you want to add a feature or there's anything wrong, read the [CONTRIBUTING](https://github.com/Alee14/DLAP/blob/stable/CONTRIBUTING.md) document, then feel free to make a fork and put a pull request.

## Looking for Maintainers
As you know, I may not keep up the project at times, or I could possibly introduce more bugs in this project. 
As well as making the code more messy. I will need to form a team in order to implement new features and make this project better. 

If you want to become a maintainer, you must at least know this source code, JavaScript and NodeJS. 
Also you must join my discord server (Support Server) to communicate with me.

# Recommended Software Requirements
- Latest version of NodeJS (v16.11.0+)
- Linux (or WSL for Windows users)
- Yarn Package Manager

# Docker
## Prerequisites
Before we begin, ensure that Docker is installed on your system. If not, you can download and install Docker from the [official website](https://www.docker.com/get-started).

## Fetching the Docker Image

You can fetch the Docker image for the DLAP bot from either DockerHub or GitHub Packages. Here are the commands for both:

### DockerHub

To fetch the image from DockerHub, use the following command:

```bash
docker pull alee14498/dlap:latest
```
### GitHub Packages
Alternatively, you can fetch the image from GitHub Packages using this command:
```bash
docker pull ghcr.io/alee14/dlap:stable
```
After running one of these commands, Docker will download the image to your system. You can then proceed to run the bot using this image.

## Building Docker Image (Optional)
If you want to build the image then using CMD or a terminal change directory to DLAP root folder and type the following:
```
docker build -t dlap .
```

- the -t flag specifies a tag that will be assigned to the image. With it, we can easily run the image that the tag was assigned to.
- the dot at the end is basically the path to search for Dockerfile. The dot means current directory (./)
- Run the container

## Running Docker Image

Follow the guide below and when ready type the following
```bash
docker run -d -v <path to config>:/usr/src/bot/config.json -v <path to music>:/usr/src/bot/music  --name dlap <image name>
```

- -d flag tells Docker to run the container in detached mode, meaning it will run the container in the background of your terminal and not give us any output from it. If we don't provide it, the run will be giving us the output until the application exits. Discord bots aren't supposed to exit after certain time, so we do need this flag
- -v flag in Docker is used for volume mounting. It creates a bind mount, which allows you to specify a host path (on your local machine) and a container path (inside the Docker container). When the Docker container is run, the specified host path is mounted into the container at the specified container path.
- --name assigns a name to the container. By default, container is identified by id that is not human-readable. To conveniently refer to container when needed, we can assign it a name
- \<image name> means the name of the image, if you are building it, then you should use `dlap:latest`, otherwise use either `alee14498/dlap:latest` or `ghcr.io/alee14/dlap:stable`.

View logs (optional)
```bash
docker logs -f dlap
```

- -f flag tells the docker to keep reading logs as they appear in container and is called "follow mode". To exit press CTRL + C.

*Docker guide partially taken from [PythonDiscord](https://www.pythondiscord.com/pages/guides/python-guides/docker-hosting-guide/#creating-dockerfile)*

# Configuration
Make a new file called `config.json` inside the root of your project.
```json
{
    "token": "token_here",
    "txtFile": true/false,
    "shuffle": true/false,
    "repeat": true/false,
    "statusChannel": "channel_id",
    "voiceChannel": "voice_channel_id",
    "clientID": "client_id",
    "ownerID": "your_user_id",
    "djRole": "role_id",
    "locale": "en",
    "presenceActivity": "activity_here",
    "activityType": [0 (Playing)/1 (Streaming)/2 (Listening)/3 (Watching)/4 (Custom)/5 (Competing)],
}
```

## Setting Up Bot
Credit: VicktorMS

First you need to create a discord application ([Discord for Developers](https://discord.com/developers/applications)) to get all the tokens you need.
This application will in fact be your bot.


*IDs available on discord for developers:*
- `"clientID"`: Select your app > Settings > General Information > "Application ID"
- `"token"`: Select your app > Settings > Bot > "Reset Token" Button

*IDs available on your discord server:*
First you need [activate Developer Mode](https://linuxhint.com/enable-or-disable-developer-mode-discord/#:~:text=To%20enable%20or%20disable%20developer%20mode%20on%20Discord%2C%20first%20launch,the%20%E2%80%9CDeveloper%20Mode%E2%80%9D%20toggle.) on Discord in order to get the IDS
- `"statusChannel"`: Create a channel in your server > Right Click on top > "Copy channel ID"
- `"voiceChannel"`: Create a channel in your server > Right Click on top > "Copy channel ID"
- `"djRole"`: Create a role in your server > Right Click on top > "Copy role ID"
- `"ownerID"`: Right Click on top of yourself on a discord server > "Copy User ID" (Your User ID is not "YouName#3217")

*Bool settings (set to true or false)*
- `"txtFile"`: true/false (Generates a text file)
- `"shuffle"`: true/false (Shuffle songs)
- `"repeat"`: true/false (Repeat all musics)

*Bot Activity*
- `"presenceActivity"`: Write any message here, it will be displayed in Bot's activity.
- `"activityType"`: Put any number between 0 and 5. That will be the Bot Activity type.

*Activity Types*

- `0`: Playing
- `1`: Streaming
- `2`: Listening
- `3`: Watching
- `4`: Custom
- `5`: Competing

## Adding Music

Create the `music` folder on root of your project.

Add your own audio files to the `music` folder.

Deploy the commands by doing `node deploy-command.js`.

Launch the bot using `node bot.js` in terminal.

# Help Command
```
Public Only
-----------
ping - Pong!
status - Checks what audio file is playing currently.
about - Information about the bot.
list - Lists the available audio tracks.
list (page) - Input a number to change the page of the list.
next vote - Goes to next music by vote.
previous vote - Goes to previous music by vote.

Special Permissions Only
--------------
join - Joins voice chat.
play - Resumes music.
play (int) - Input a number for the selection for the audio file.
pause - Pauses music.
next force - Goes to next music by force.
previous force - Goes to previous music by force.
reshuffle - Reshuffles the playlist.
leave - Leaves voice chat.
shutdown - Powers off the bot.
```

# Forking
When forking the project, you can make your own version of DLAP or help contribute to the project (See the "Contributing" section).

You need to edit `/commands/about.js` to uncomment the `{ name: 'Forked by', value: '[your name] (username)' }` section.

Be sure to replace that with your name.

# Contributing
When contributing, be sure to add yourself to the contributors list in `/commands/about.js`.

## Translating
If you want to translate DLAP with another language, create a Parlance account (Victor Tran Account), and ask Victor Tran (server owner) on the [Victor Tran Discord](https://discord.gg/nBpePYdt7U) for permission to translate DLAP.

# Future Features
* Easier to use interface

# Credits
ChatGPT: Some code in this codebase used ChatGPT
