# Bechdel Test Movie Script Parser

## The Bechdel Test, sometimes called the Mo Movie Measure or Bechdel Rule is a simple test which names the following three criteria:

1. It includes at least two women
2. who have at least one conversation
3. about something other than a man or men.

The test was popularized by Alison Bechdel's comic Dykes to Watch Out For, in a 1985 strip called The Rule. For a nice video introduction to the subject please check out The Bechdel Test for Women in Movies on [feministfrequency.com](http://feministfrequency.com/).

![Bechdel Test](http://www.mestudios.com/wp-content/uploads/2014/12/Bechdel-the-rule.jpg)

This program accepts a movie script and analzes whether or not it passes the Bechdel Test, as well as analyzing several other feminist components to a film. It can answer questions like "How many females are in this film," "By what factor does this pass the Bechel Test?"

## Setup Your Project

Download and unpack [Bechdel Test](https://github.com/JoeKarlsson1/bechdel-test). Or alternatively checkout from source:

    git clone https://github.com/JoeKarlsson/bechdel-test
    cd bechdel-test

Next, inside the project, you need to install the project's various NPM dependencies:

    npm install

And you should now be ready to spin up a development build of your new project:

    npm start

Navigate to [http://localhost:3000](http://localhost:3000) in your browser of choice.

##Introduction
The Bechdel Test Script Parser was a collaborative digital humanities project between myself and my sister, Laurel Karlsson. It is the product of a shared passion for film, feminism, and the creative potential of technology. By combining the talents and interests of myself, a software engineer, we’ve been able to create an innovative data mining tool for film analysis that we hope to continue to work on and improve. You can check out the project on our [website](https://bechdel-test.herokuapp.com/).

This project was born when my sister reached out to me for advice on a few ideas she had been mulling over for a digital humanities project. Hoping to do something related to feminist film analysis, she was feeling very limited by my lack of coding experience and hadn’t been able to find an existing data mining tool to accomplish what she was looking to do. I immediately offered up my coding expertise, looking to gain experience by building a tool from scratch which would accomplish the specific needs of the project. After brainstorming several different project ideas, we settled on the one you see here.

## How It Works
Of all narrative textual forms, the motion picture screenplay may be the most perfectly pre-disposed for computational analysis [[Murtagh, Ganz, and Reddington 2011]](http://www.digitalhumanities.org/dhq/vol/8/4/000190/000190.html). Screenplays contain capitalized character names, indented dialogue, and other formatting conventions that enable an algorithmic approach to analyzing and visualizing film narratives [[Hoyt, Ponto, Roy]](http://www.digitalhumanities.org/dhq/vol/8/4/000190/000190.html). Coupled with massive online movie databases, we can parse through movie scripts and collect insights on a level not yet seen before. In this article, the authors introduce their new tool, Bechdel Test Visulizer, which parses screenplays, outputs statistical gender values which can be analyzed, and offers four different types of visualization, each with its own utility. In this analysis, the authors use the Bechdel Test Visualizer to analyze the 2014 Oscar Best Picture Nominees.

In the process of building this tool’s prototype, I have come to appreciate the many ways that a computer reads a screenplay differently from you or me. Humans gather insight from watching and experiencing the emotion, tension, and dynamics of a movie or screenplay. Rather than attempting to train a computer to understand a film in the exact same way I do, I would prefer to ask a computer to do tasks that it is designed to do well and that we humans struggle with. Humans have memory limitations when it comes to matters of sequential timing and the entrances and exits of dozens of characters. In contrast, computers are excellent at gathering and recording these sorts of details from structured texts[[Murtagh, Ganz, and Reddington 2011]](http://www.digitalhumanities.org/dhq/vol/8/4/000190/000190.html). Lev Manovich has suggested that one of the most valuable things that comes from combining computational analysis and the visualization of vast amounts of information in a single image is that it defamiliarizes our understanding of the works that we study in the Humanities [[Manovich 2012]](https://sc.edu/about/centers/digital_humanities/future_knowledge_archive/manovich_videopage.php). As I hope to demonstrate, the Bechdel Test Visualizer is a powerful tool for defamiliarization, provoking new questions and gender and film, and producing new answers through the combined strengths of the human analyst and the computer.

## Parsing Method
The Bechdel Test Visualizer is web application built enirely using JavaScript and Node.js. This tool uses a combination of online databases manual script parsing in order to collect insights about a film.

First, the script finds the title of the film, this is generally on the first page, and for the prototype, it is requireed to be the first line of text in the txt file. Once the title of the film has been identified, I make an API call out to [myapifilms.com](http://api.myapifilms.com/imdb.do). From here, I can collect general information about the film, such as genre, release year, runtime, etc. But the most important information comes from collecting information about the actors and actresses in the film. Using this API, I can collect a list of all of the actors and actresses, their character's name in the film, and what gender they are. The character's gender is the most important bit of information I can collect, since it is essential when trying to determine if a scene passes the bechdel test or not.

Once all of the gender and film data has been collected via the API - I can begin analyzing the script. The first step is to break the script down into scenes in order to tell if two females shared a scene together. Scenes were determined by looking for a user defined set of keywords, such as "int." or "ext.". In practice, it was determined that a list of 10-12 keywords well captured scene changes.

In the scene, I collected dialogue by character by using simple parsing techniques. I was then able to test if two female character's shared a scene. If two or more females shared a scene together, I tested their dialogue by checking if their dialogue contained keywords that indicated that they were speaking about a men or men. This list included words like 'He', 'Him', 'Father', 'King', etc. This list is very basic, and after initial tests, I can see that this list needs additional work, as patriarchal words are very ingrained in the English Language, and judging context is very difficult for a computer to do. However, for the context of my experiments, this list has sufficed. This tool, however is very good at generating data on gender participation in films.

### Available Targets

#### `start`

Starts up the server - used for dev purposes

#### `test`

Runs server side tests once. Tests are run using Mocha, Chai and SuperTest

#### `test:server:watch`

Have the test run continuously in the background.

### `build`

Build the application as it would be setup on a Production server - used for testing production webpack configuration on local development enviornment.

### `eslint`

Lint the file using a custom AirBnB configuration.

### `postinstall`

Used for cleaning up webpack build on Heroku.


##Contributing
1. Fork it!
2. Create your feature branch: ```git checkout -b my-new-feature```
3. Commit your changes: ```git commit -am 'Add some feature'```
4. Push to the branch: ````git push origin my-new-feature````
5. Submit a pull request :D

##Credits
- Joe Carlson
- Laurel Carlson

##Related Links
- [The Internet Movie Script Database (IMSDb)](http://www.imsdb.com/)
- [The Open Movie Database](http://www.omdbapi.com/)
- [Visualizing and Analyzing the Hollywood Screenplay with ScripThreads](http://www.digitalhumanities.org/dhq/vol/8/4/000190/000190.html)
- [Check out our trello board for next steps](https://trello.com/b/Ldg9sYtf/bechdel-test)
