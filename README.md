# Next Academy Bootcamp Learning Log

|Date |          January - March 2020                              |
|:---:|:---------------------------------------|
|     |Progress, thoughts and ideas	       |


[__************** 2020 Objectives **************__]

----------------------------------------------------------
To fast track my learning by joining coding boot camp, building projects and eventually get into a full time tech role.

Most importantly, be a constant learner, taking up new challenges and open to learning new technologies/frameworks.

----------------------------------------------------------


[__************** 2019 Objectives **************__]

----------------------------------------------------------
To build up my foundation in front end web development, particularly Javascript and JS frameworks.

----------------------------------------------------------
## Wed 4 Mar 20
Today we focus on implementing the Google Oauth sign in feature so the users can sign in via Google account. Our approach for this bootcamp is to use a user's Google email to match with his/her account on our app (in other words, when a user clicks sign in via Google on our app, we will try to find a matching email address and sign them in).

[OAuth 2.0 Google](https://developers.google.com/identity/protocols/OAuth2)

### Terminologies
|Term|Explanation	|
|:---:|:------------------|
|OAuth Client|Our app|
|OAuth Server|Google, Facebook, Twitter, Github and more (we could also make our app an OAuth server to allow other developers to build apps that allows their users to sign in via our app (different meaning from OAuth server; server don't refer to the same thing here)|
|Server side |	We are using server side authentication with Google rather than client side|
|Client side	|Client side means frontend (different meaning from OAuth client; client don't refer to the same thing here)|

## Tue 3 Mar 20
Today we work on setting up a payment gateway for image donation by other users. We should store their donation record in database once payment is successful. It would be good to record how much they donated, for which image and donated by whom. We use Braintree as our credit card processor. Braintree is one of the most renown payment gateway in the world.

[Braintree Documentation](https://developers.braintreepayments.com/start/overview)

We will need to set up a new model, Donation and migrate it to the database. Undestanding the workflow of the payment gateway is extremely important. While reading the documentation, client refers to our frontend (templates) and server refers to our backend (views, models etc+). We need to use both the client and server SDKs.

## Mon 2 Mar 20
Today we focus on implementing user images uploading feature where previously we had successfully handled the profile picture function. It's more or less the same steps we used on Friday. We have no lectures today and most of the time we spend is on discussion with other group members or seek for help from mentors if we get stuck for too long.

```
// upload function in views.py

@sessions_blueprint.route('/upload/images', methods=['POST'])
@login_required
def upload_images():
    if "user_image" not in request.files:
        flash('No image has been provided', 'warning')
        return redirect(url_for('session.new'))

    file = request.files.get("user_image")
    caption = request.form.get("caption")

    file.filename = secure_filename(file.filename)

    if not upload_file_to_s3(file):
        flash('Oops, something went wrong while uploading', 'warning')
        return redirect(url_for('sessions.new'))

    user = User.get_or_none(User.id == current_user.id)

    img_upload = Image(user=user.id, user_image=file.filename, caption=caption)

    img_upload.save()

    flash('Successfully uploaded Image', 'success')
    return redirect(url_for('sessions.new'))

```

[N+1 Query Problem](http://docs.peewee-orm.com/en/latest/peewee/relationships.html#nplusone)

## Fri 28 Feb 20
Today we work on building an edit page where user can edit their profile and upload their profile image. We also learn how to use Amazon S3 to store our images.

[How to upload image to Amazon S3 via Flask]( https://www.zabana.me/notes/flask-tutorial-upload-files-amazon-s3)

[Hybrid Property](http://docs.peewee-orm.com/en/latest/peewee/playhouse.html#hybrid)

## Thu 27 Feb 20
Today we focus on building the login page where users can successfully sign in and store the session using the package `pip install flask-login` and error page when the user information is incorrect.

Steps for flask-login:
```
// in __init__py
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    from models.user import User
    return User.get_or_none(User.id == user_id)

```
Documentation: [Flask-login](https://flask-login.readthedocs.io/en/latest/)

Insert handling error function into __init__py:
```
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
```
Documentation: [Error Pages](https://flask.palletsprojects.com/en/1.0.x/patterns/errorpages/)

## Wed 26 Feb 20
Back to Nextagram again ! This time, we focus on the backend by using Flask and PostgreSQL. For the next 2 weeks, we will be implementing features such as:

1. user sign up (encrypting passwords)
2. user sign in (authentication, authorization, cookies and sessions)
3. sign in via Google (OAuth)
4. image uploading (using Amazon S3) *let us know early if you don't have a credit card
5. sending emails (consuming external APIs)
6. collecting payments via credit card (integrating payment gateways)
7. complex model relationships (self-referential many-to-many)
8. RESTFUL endpoints (exposing APIs for other apps to consume)

Today we focus on the user sign up page where we use POST method to store the input (username, email & password) the user keys in to the database, implementing features such as form validation, password hashing & password constraints etc.

And Yes, the learning curve is steep !

## Tue 25 Feb 20
Second day into Flask. Today is a challenging one compared to the previous day! We created an inventory management where we can create, update and delete the product/warehouse.

Note: Here are the 7 typical routes for RESTFUL convention:
|Purpose	    |View Function	|HTTP Verb	|Route|
|:---:|:------------------|-------------|--------|
|load a form to create resource	|new()|	GET|	/resources/new|
|create resource	|create()|	POST|	/resources/|
|view all resources	|index()|	GET|	/resources/|
|view a particular resource	|show()|	GET	|/resources/:id|
|load form to edit a particular resource	|edit()|	GET|	/resources/:id/edit|
|edit a particular resource	|update()|	POST|	/resources/:id|
|delete a particular resource	|destroy()|	POST	|/resources/:id/delete|

## Mon 24 Feb 20
Today we started Flask, a micro web framework written in Python. Everytime we `pip install <package_name>`, we should also `pip freeze > requirements.txt`.

What if we want to retrieve some data from the database to be displayed to the user? We can pass down variables like below: 
```
// in app
from flask import Flask, render_template
app = Flask(__name__)

@app.route("/<name>")
def index(name):
    name = name.upper()
    return render_template('index.html', name=name)

if __name__ == '__main__':
    app.run()
```
```
// in index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
</head>

<body>
  <h1>Hello, {{name}}!</h1>
  <img src="../static/hello.jpg" />
</body>
</html>
```

## Fri 21 Feb 20
Peewee and PostgreSQL. This section has plenty of documentations/articles that I have yet to read, will read it during the weekends or at night. We learned how to use Postbird and PostgreSQL to replace SQLite. 

Important note: Everytime we `pip install <package_name>`, we should also `pip freeze > requirements.txt`

Steps to create a table in python REPL command line: 
```
from orm_practice import *

db.connect()
db.create_tables([Store, Product, Warehouse])
# This is how you create an entry to database
# create an instance of Store
meng_store = Store(name="Meng's Camera Store")

# save it to database with the following line of code
meng_store.save()

warehouse_one = Warehouse(location="5 Jalan Damansara", store=meng_store)
warehouse_one.save()

warehouse_two = Warehouse(location="5 Jalan Cempaka", store=meng_store)
warehouse_two.save()

sony_rx100 = Product(
   name="Sony RX100", description="Sony compact camera", warehouse=warehouse_two)
sony_rx100.save()
```

## Thu 20 Feb 20
Into Structured Query Language (SQL) today. Why is it important? Because we need to access the database to get meaningful information.It could be for analytics, to cross check our data input AND most importantly, we need to know how to query to eventually determine what information to show on our web app based on who is using it.

It is interesting when going through the [SQL challenges](https://sqlzoo.net/wiki/SQL_Tutorial) and you can imagine the potential of SQL in looking up data in a database. However, it can get really confusing at times. We were having a hard time (including the mentors) in this question and the answer looks like this:
```
SELECT vt.first_name, vt.last_name, vt.party, vt.gender, cm.name FROM voters vt
JOIN votes v ON v.voter_id = vt.id
JOIN congress_members cm ON cm.id=v.politician_id
WHERE  politician_id=(SELECT politician_id from votes
JOIN congress_members ON politician_id=congress_members.id
GROUP BY name
ORDER BY COUNT(name) DESC LIMIT 1)
```
Useful documentation: [SQLite Tutorial](http://zetcode.com/db/sqlite/)

IMPORTANT: SQL order to follow:
```
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);
```

## Wed 19 Feb 20
Today we learn about Schema and its relationships. There are 3 types of relationship:
1. One to one
2. one to many
3. Many to many

Many-to-many relationships are relatively easy to understand, but slightly more complicated to implement. For example, an author can write many books, and a book can be written by many authors. We model this relationship by creating a joint table.

The second half of the day we focus on Schema challenges and started earlier on SQL which originally supposed to be taught on the next day.

## Tue 18 Feb 20
We went through Pypi, PIP, modules, packages, special variables, function decorator. PyPi is an online repository of published open sourced libraries. However, decorator is a useful one.

Let's say you have a function and you want to extend the functionality of it. You have 2 options
1. Modify the code in the function
2. Write a new function and call the function within you original function
However, when you want to add/remove the functionalities frequently, it gets complicated.
You could also have similar logic shared across multiple functions using decorators! Writing code just once.

```
def some_decorator(my_func): # this is a decorator function
   
    def wrap_func():
        print("Execute this first before my_func") # do something first
        my_func() # execute the original function
        print("Execute this after my_func") # do something after

    return wrap_func # decorator functions always return a function without calling it e.g. `wrap_func()`

def my_function():
    print("Hello World")

@some_decorator # adds functionality to `my_function`
def my_function():
    print("Hello World")                                // is equivalent to my_function = some_decorator(my_function)
    
my_function()
```

## Mon 17 Feb 20
Named Arguments in python and Object Oreiented Programming (OOP). OOP helps us organise our code better and make our code repeatable thus saving our time. A Class template looks like this:
```
class Dog():
    species = 'mammals' # class attribute; same for all instances of the class

    def __init__(self, breed, name):
        self.breed = breed
        self.name = name

daisy = Dog('Shih Tzu', 'Daisy')

print(daisy.name) // 'Daisy'
print(daisy.breed) // 'Shih Tze'
print(daisy.species) // 'mammals'
```
We spend most of the time doing challenges today!

## Fri 14 Feb 20
Python third day: Recursion, Regular Expression & building Boggle Board. Today we mainly spend time working on challenges on all topics, researching and discussing with others. Regular expression is really an interesting one, I can see how powerful it is when you want to look for any string or text that matches a specific pattern.

[Regular Expression Documentation & Challenges](https://regexone.com/references/python)

[Phythex](https://pythex.org/)

I found this [Regex cheatsheet](https://www.debuggex.com/cheatsheet/regex/python) and it is really useful!

Ohh crap, I have a Valentines dinner to catch up !

## Thu 13 Feb 20
Second day into Python. We go through function, scopes and many other challenges. The second half of the day we are assigned into team of 3 and build TicTacToe, again ! This is the third time tictactoc after using plain vanilla Javascript, React and now Python. I can see how useful it is to build a TicTacToc as it involves a lot of logics and presentation and the same time. One of the best way to get started and understand the language.

The final assignment is a TicTacToe vs Computer. We need to write the algorithm for the computer to play with us. The steps are:
1. Check if we (as computer) can win in the next move.
2. Check if the player could win on their next move, and block them.
3. Try to take one of the corners, if they are empty.
4. Try to take the center, if it is empty.
5. Move on one of the sides.

Kindly note that the steps above are ranked top to bottom, as it takes precedence over another.

## Wed 12 Feb 20
First day of Back End Web Development. Setting up python, install Anaconda and go through the introduction of Python 101 & 102. It's great to see the difference between Python and Javascript, since I have way more experience in Javascript. Perhaps my first impression of the well known high-level programming language, Phython in this case, is true. The syntax is relatively short and we can write a lot of one liner code compared to Javascript. Example:
```
word_list = ['Java', 'Golang', 'Python', 'JavaScript']
# Instead of writing:
# words = []
# for word in word_list:
#     if len(word) > 5:
#         words.append(word)

words = [ word for word in word_list if len(word) > 5]
print(words) // return ['Golang', 'Python', 'JavaScript']
```

## Tue 11 Feb 20
Last day of React ! Time flies. It has been a month in this bootcamp and honestly, I am quite satisfied with the overall progress. I didn't carry much expectation when I first decided to join, but along the way I've made friends and learned exciting stuff that's really value adding. Before I join the bootcamp, I take the bootcamp as a starting point to embark on a developer path, acknowledging that I have to put in the hours first before everything else, more of I treat it as an end in itself.

Thoughts aside, we learn how to build a chatroom today using socket.io `npm install --save socket.io-client`. We have a brief understanding on React Native too, though there are lots of sayings (pros & cons) on the usage of React Native, I have yet to figure it out on my own, and will do so in the near future.

## Mon 10 Feb 20
Today we learn how to create a new component UploadImage.js, which handle the function of uploading images. First we create a form and the difference here is, set input `type="file"` and use e.target.file to get access to the image. Then we can use `setImageFile(e.target.files[0])` so that we can hold onto it and use it later when we submit the form to the server.

To be able to show the preview image, we can use a built-in JS function that generates a URL from the uploaded image file 
```
setPreviewImage(URL.createObjectURL(e.target.files[0]))
setImageFile(e.target.files[0])
```
We generate a URL using the URL.createObjectURL() function and we pass in the file we want to generate the URL for. By adding this to the state, we are now able to see the image to be uploaded previewed in the container that we just created.

Lastly, we learn how to deploy our site to netlify and `npm run build`.

## Fri 7 Feb 20
Today we work on building "My Profile Page" that you will be led to once you've logged in. It's astonishing to see how conditional ternary operator is being used, for exanple, one of the requirements is - Upon logging out, you should trigger a re-render to update the UI so that user knows he/she is logged out.

Note to self: We should always thinking of creating a new state to be used as a variable.

```
const [currentUser, setCurrentUser] = useState(null); // in App.js

// in NavBar.js
return (
  <div>
    {currentUser ? (
      <NavItem className="mr-5">
        <NavbarText>Hello, {currentUser.username}</NavbarText>
      </NavItem>
    ) : (
      ""
    )}
  )
    
```
Next, we call an API endpoint after logging in and returning us our own profile page, however this API request requires a authorization header with JWT token. This is because every single user has an unique JWT and it has to match with the server to fetch the API. Then we return all our uploaded images (using mapping) under our profile page.
```
  const [images, setImages] = useState([])

  useEffect(() => {
    axios({
      method: "get",
      url: "https://insta.nextacademy.com/api/v1/images/me",
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
    }).then(result => {
      setImages(result.data)
    });
  }, []);
  
  return (
    <>
    {images.map( image => {
      return (
        <div>
          <Image
            src={image}
          />
        </div>
      );
    })}
    </>
  )
```

## Thu 6 Feb 20
Today we learn how to consume Sign Up API endpoint and to use React Toastify to prompt user when they have logged in or signed up successfully.
```
npm install --save react-toastify

import { ToastContainer } from 'react-toastify'; // in App.js
import "react-toastify/dist/ReactToastify.min.css"; // in index.js
```

The next interesting one is incorporating Validation in the Log In and Sign Up forms.
Example: If the password does not meet the minimum requirements of being at least 6 characters long, display to the user that the password is too short.

Next: JWT (JSON Web Token).
In order to obtain JWT, users need to login through your React app - making POST request to /login will return JWT if the email-password combination is correct. Then we can either store the JWT in local storage or session storage. We can simply write data into the storage:
```
localStorage.setItem('name', 'Josh')

// or read from them
localStorage.getItem('name') // "Josh"
```

## Wed 5 Feb 20
I love today's lesson! Today we learn how to create a React form (Login and Signup form) and React To-Do List. 

Important things to note: Always use Controlled Form. In a controlled form component, we make sure everything goes through state.

In React, there is virtual DOM and real DOM. Whenever there is a state change or change in the props, React only updates the virtual DOM. The virtual DOM will then compare its differences with real DOM and only update the differences, making the whole process lightning fast.

Steps in React Form
1. First we create a Modal component (accessible from navbar), which can be toggled between Login and Sign up component.
```
const AuthModal = ({ buttonLabel }) => {
  const [modal, setModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const toggle = () => {
    setModal(!modal);
    setShowLogin(true);
  };

  const toggleLogin = () => setShowLogin(!showLogin);

  return (
    <div>
      <NavLink style={{ cursor: "pointer" }} onClick={toggle}>
        {buttonLabel}
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {showLogin ? "Login" : "Sign Up"}
        </ModalHeader>
        <ModalBody>{showLogin ? <LoginForm /> : <SignUpForm />}</ModalBody>
        <ModalFooter>
          <Button color="link" onClick={toggleLogin}>
            {showLogin
              ? "Not registered? Sign Up Now"
              : "Already a user? Sign In"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
```
2. Then we create 2 components for each Login and Signup form. Always remember to use State for every variables (e.g. email, password, username etc).
An extract of the code:
```
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email Address</Label>
          <Input
            type="text"
            placeholder="Enter email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        </Form>
    </>
  );
}
```


## Tue 4 Feb 20
Second day into building Nextgram. Today we learn about React Router. 

1. Install react router ( npm install --save react-router-dom )
2. import { BrowserRouter } from 'react-router-dom'
3. In index.js
```
ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
)
```
```<Route>``` defines what component to render at certain path.

```<Link>``` is a helper component that automatically creates <a> tag for you.
    

## Mon 3 Feb 20
First day into building Nextgram. First we fetch Nextgram API by using axios in React. We use a library called Axios to make the API call process easier, the call looks very similar to Fetch, but less wordy.
```
// npm install --save axios

import axios from 'axios';

useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        setUsers([...result.data]);
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  }, [])
```
Other lessons: Install reactstrap, react-graceful-image, adding loader, using props in loader (reusable functional component).

Objective: [Nextgram](https://insta.nextacademy.com/users/)

## Fri 31 Jan 20
Today we learn how to build a TicTacToe using React. Previously we had built it using HTML, CSS & vanilla JS. It's amazing to see how powerful React is in managing the state and passing down prop, and to realise the advantage React has over no-framework-DOM-manipulation.

Article to read: [Thinking in React](https://www.codementor.io/@radubrehar/thinking-in-react-8duata34n)

## Thu 30 Jan 20
Today is an intersting one. We learn to build a calculator by using React and it took me a while to figure out how everything works
(passing down props and destructuring).

Lessons: Git command, Build Calculator

## Wed 29 Jan 20
First day of ReactJS. Getting ourselves familiar with Javascript ES6 features and syntax. I'm familiar with most of lessons taught except Destructuring. It's an interesting one and it got me stuck for a while, it turns out that Function Destructuring works in a similar way with Array Destructuring, it takes the index number in the array that you return, and set the variables accordingly.
```
const getState = state => {
  let newFunction = () => {
    console.log(`Your state is ${state}`)
  }
  return [state, newFunction]
  
}

const [state, logState] = getState('stable')
console.log(state) // The console should print out 'stable'
logState() // The console should print out 'Your state is stable'
```

## Tue 28 Jan 20
Last day for the 2-week front end HTML,CSS course. Today we learned how to build a message board where we used "POST" and "GET" to fetch messages from the same endpoints. It's interesting to see how we can interact with the messages and others'.

READ: [What is the difference between POST and GET?](https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get)

## Thu 23 Jan 20
Last day before we off for Chinese New Year and resume lesson on next Tuesday. Today we learned how to use Airtable and GET the API. It's astounding to see how powerful API is, in performing certain tasks by just fetching the API and it handles the rest for us without writing tedious steps in javascript. Web application used: Airtable & Zapier.

## Wed 22 Jan 20
Today we have to build a tic tac toe. It's interesting while figuring out the logic and decide who's the winner. 

The second part is even more interesting: Introduction to API. We learned how to interact with API using both methods (Javascript & jQuery) and build a GIF generator with API.
```
// Vanilla Javascript fetch function
fetch("https://api.chucknorris.io/jokes/random")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data.value);
  });

//jQuery ajax
$.ajax({
  url: "https://api.chucknorris.io/jokes/random",
  method: "GET",
  success: function(result) {
    console.log(result.value);
  },
  error: function(error) {
    console.log(`Error: ${error}`);
  }
});
```

## Tue 21 Jan 20
Today we have to build a to do app with the following requirements:
1. Allow users to add any text input into the list
2. Users can delete a task from the list by clicking on it
3. Disable the add button when the text input is less than 3 character
4. Clear text input after each submission

I had built a to do app back in September 2019 by watching [Watch and Code](https://watchandcode.com). Though I still need to incorporate requirement #2 and #3 into the code.

## Mon 20 Jan 20
Second week into the coding bootcamp ! Today we went through DOM manipulation, how to access HTML from Javascript (e.g createElement, getElementbyId, append, innerHTML).

Though we probably don't use every single DOM methods except a few, today's lesson helps in having an in-depth understanding. I'm sure it will provide more value when situation like this arise in the future. 

## Fri 17 Jan 20
Second day into Javascript, introducing loops (e.g For, while, if statement). The group activity is a challenging one as our group got the hardest problem (claimed by the mentors), and we are only allowed to use ONE while loop. We went through stack overflow and found a similar solution but we didn't understand what the code says. Thus we re-engineer and break it down into pieces and we got it after half an hour. Solution:

```
function romanize(num) {
  if (isNaN(num))
    return NaN;

  let digits = String(num).split("");

  const key = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
    "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
    "", "M"];

  let roman = "";
  
  let i = 0; 
  while (i < num.length) {
    roman = (key[+digits.pop() + (i * 10)]) + roman; 
    i ++}

  return roman;
  
}

console.log(romanize(1426));
```

## Thu 16 Jan 20

First day of JavaScript, I'm like "YESS, finally!" Nothing particularly challenging as I've been writing JS for 4 months now. Group presentation on explaining data prototypes, e.g. push, indexOf, sort, includes etc. First Challenge is to use write javascript so that it will calculate your BMI for you: https://code.nextacademy.com/lessons/exercise--bmi-calculator/980. I wrote it in a function since it can take in both parameters: 

```
function calculateBMI(myWeight, myHeight) {
  let myBMI = myWeight / (myHeight * myHeight);
  if (myBMI < 18.5) console.log(`Your BMI is ${myBMI}. You are underweight`);
  else if (myBMI >= 18.5 && myBMI <= 24.9)
    console.log(`Your BMI is ${myBMI}. You are in the healthy weight range`);
  else if (myBMI >= 30 && myBMI <= 40)
    console.log(`Your BMI is ${myBMI}. You are overweight`);
  else console.log("Why my BMI is not specified!!!");
}

calculateBMI(82, 1.78); //  return Why my BMI is not specified!!!

```
The second challenge is FizzBuzz: https://code.nextacademy.com/lessons/challenge--fizzbuzz/868 -
```
<!DOCTYPE html>
<html>
  <body>
    <p>Click the button to demonstrate the fizzBuzz.</p>

    <button onclick="fizzBuzz()">Try it</button>

    <p id="demo"></p>

    <script>
      function fizzBuzz() {
        let number = prompt("Please enter your number");
        let result = "";
        if (number >= 1 && number <= 100) {
          if (number % 3 == 0 && number % 5 == 0) {
            alert("FizzBuzz");
          } else if (number % 3 == 0) {
            alert("Fizz");
          } else if (number % 5 == 0) {
            alert("Buzz");
          }
        } else alert("Enter a number between 1-100!");
      }
    </script>
  </body>
</html>
```

## Wed 15 Jan 20

Working on Bootstrap. First Challenge is to use only Bootsrap to clone a website without writing any CSS code: https://bootstrap-next-example.netlify.com/. Though I have limited experience on Bootstrap, it's impressive to see what Bootstrap alone can do and I get to know Bootstrap in an in-depth level today. Good stuff.

The second challenge is to use a combination of Bootstrap and CSS to clone a website: https://musing-goodall-f54def.netlify.com/.

## Tue 14 Jan 20

Mainly working on CSS Animations. We have a group project after lunch which requires us to clone a website: https://shopme-next.netlify.com/. Worked with team member Kay Shaun and Irsyad.

Materials on flexbox to read:

1. https://flexboxfroggy.com/
2. https://css-tricks.com/snippets/css/a-guide-to-flexbox/
3. https://github.com/samanthaming/Flexbox30#align-items-row

## Mon 13 Jan 20

First day of Next Academy Full Stack Web Development Bootcamp. Introduction to HTML & CSS, refershing what I have gone through on FreeCodeCamp and Codecademy when I first started coding in Sept 2019. 
