import {createTranslations} from 'react-text-translator';

//текстът на български и английски
export const translator = createTranslations({
	//stripeAuth page:
	'stripeAuthInfo': {
		bulgarian: 'Поздравления, упсешно се регистрирахте в Bookly. Но, ако искате да приемате плащания и да продавате книгите си трябва да създадете stripe акаунт. Ако ще публикувате творбите си безплатно или само ще четете, може да пропуснете тази стъпка. Комисионната на Bookly е 7% за всяка продадена книга. Чрез създаване на stripe акаунт, Вие приемате техните ',
		british: 'Hey, you have successfully joined Bookly! However, if you want to accept payments and sell your books, you need to create a stripe account. Otherwise you are good to go. Bookly takes a commission of 7% for every sold book. By creating a stripe account you accept their ',
	},
	'Conditions': {
		british: 'Terms of service',
		bulgarian: 'правила и условия',
	},
	'LastStep': {
		british: 'One last step',
		bulgarian: 'Една последна стъпка'
	},
	'CreateStripeAcc': {
		british: 'Create stripe account',
		bulgarian: 'Създаване на stripe акаунт'
	},
	'Skip': {
		british: 'Skip',
		bulgarian: 'Пропуснете'
	},
	//landing page:
	'BooklyInfo': {
		british: 'Bookly is a website that allows you to explore and buy books written from aspiring authors. Here you can share your own literary work with a community of readers and receive feedback and comments. You can also read the latest, highest rated, and most popular books on the platform or search for a specific one. Whether you are a writer looking to improve your craft and gain publicity or a reader looking for new stories to enjoy, this app is exactly for you.',
		bulgarian: 'Bookly е уебсайт, който Ви позволява да разглеждате и купувате книги както от любители, така и от професионални писатели. Тук можете да споделите собствената си литературна творба с общност от читатели и да получите обратна връзка чрез коментари. Също така можете да прочетете най-новите, най-високо оценените и най-популярните книги на платформата или да потърсите конкретна творба. Независимо дали сте писател, който иска да се популяризира и да подобри уменията си , или читател, който търси нови истории, на които да се наслади, това приложение е точно за Вас.'
	},
	'CreateAcc': {
		british: "Create an account",
		bulgarian: "Създаване на акаунт"
	},
	//navbar:
	'SignIn': {
		british: "Sign In",
		bulgarian: "Вход"
	},
	'SignUp': {
		british: "Sign Up",
		bulgarian: "Регистрация"
	},
	'Profile': {
		british: "My profile",
		bulgarian: "Моят профил"
	},
	'Publish': {
		british: 'Publish a book',
		bulgarian: 'Публикувай книга'
	},
	'MyBooks': {
		british: 'My books',
		bulgarian: 'Моите книги'
	},
	'Theme': {
		british: 'Theme',
		bulgarian: 'Цветова тема'
	},
	'Lang': {
		british: 'langauge',
		bulgarian: 'език'
	},
	//sign in:
	'Welcome': {
		british: 'Welcome back !',
		bulgarian: 'Добре дошли !'
	},
	'Email': {
		british: 'Email',
		bulgarian: 'Имейл'
	},
	'Password': {
		british: 'Password',
		bulgarian: 'Парола'
	},
	//sign up:
	'Name': {
		british: 'Name',
		bulgarian: 'Потребителско име'
	},
	'Next': {
		british: 'Next',
		bulgarian: 'Напред'
	},
	'Age': {
		british: 'Age',
		bulgarian: 'Възраст'
	},
	'Gender': {
		british: 'Gender',
		bulgarian: 'Пол'
	},
	'Bio': {
		british: "Bio",
		bulgarian: 'Биография'
	},
	'Male': {
		british: 'Male',
		bulgarian: 'Мъж'
	},
	'Female': {
		british: 'Female',
		bulgarian: 'Жена'
	},
	'Other': {
		british: 'Other',
		bulgarian: 'Друг'
	},
	'Back': {
		british: 'Go back',
		bulgarian: 'Назад'
	},
	'Submit': {
		british: 'Submit',
		bulgarian: 'Готово'
	},
	//footer:
	'Made' : {
		british: 'Made with',
		bulgarian: 'Направено с'
	},
	'Maksim': {
		british: ' by Maksim Hristov',
		bulgarian: ' от Максим Христов'
	},
	//home page:
	'List': {
		british: 'Your reading list',
		bulgarian: 'Вашият списък с книги'
	},
	'Popular': {
		british: 'Popular books',
		bulgarian: 'Популярни книги'
	},
	'HighestRated': {
		british: 'Highest rated books',
		bulgarian: 'Най-високо оценени книги '
	},
	'New': {
		british: 'New realeses',
		bulgarian: 'Нови книги'
	},
	//search page:
	'BooksTitle': {
		british: 'Books with simular title',
		bulgarian: 'Книги с подобно заглавие'
	},
	'BooksAuthor': {
		british: 'Books by this author',
		bulgarian: 'Книги от този автор'
	},
	'BooksTags': {
		british: 'Books with the same tags',
		bulgarian: 'Книги със същaта ключова дума'
	},
	'NoBooks': {
		british: "Sorry, couldn't find simular books",
		bulgarian: 'Не успяхме да намерим подобни книги.'
	},
	//page 404:
	'NotFound': {
		british: "Sorry, this page was not found.",
		bulgarian: 'Страницата не беше намерена.'
	},
	'GoHome': {
		british: "Go back to home",
		bulgarian: 'Към основната страница'
	},
	//success page:	
	'Success': {
		british: "Payment successfull",
		bulgarian: 'Заплащането беше успешно'
	},
	'ThankYou': {
		british: "Thank you for your purchase !",
		bulgarian: 'Благодарим Ви за направената покупка !'
	},
	//comments:
	'Comments': {
		british: "Comments",
		bulgarian:"Коментари"
	},
	'Send': {
		british: "Send",
		bulgarian: "Изпрати"
	},
	//bookdetail.jsx :
	'Rate': {
		british: "Rate",
		bulgarian: "Оценяване"
	},
	'Free': {
		british: "Free",
		bulgarian: "Безплатно"
	},
	'StartReading': {
		british: "Start reading",
		bulgarian: "Прочети"
	},
	'Buy': {
		british: "Buy now",
		bulgarian: "Купи сега"
	},
	'About': {
		british: "About the author",
		bulgarian: "За автора"
	},
	//rate card:
	'Rate2': {
		british: "Rate",
		bulgarian: "Оценяване на"
	},
	'FromTо': {
		british: "From 1 to 5",
		bulgarian: "От 1 до 5"
	},
	//card component:
	'Read': {
		british: "Read",
		bulgarian: "Прочети"
	},
	//upload page:
	'Upload': {
		british: "Upload Your Book!",
		bulgarian: "Публикувайте книга си!"
	},
	'Title': {
		british: "Title",
		bulgarian: "Заглавие"
	},
	'Cover': {
		british: "Book Cover",
		bulgarian: "Снимка на корицата"
	},
	'Price': {
		british: "Price (in BGN leva)",
		bulgarian: "Цена (в бг лев)"
	},
	'Desc': {
		british: "Description",
		bulgarian: "Описание"
	},
	'TagMore': {
		british: "Add tags to help readers find your content.",
		bulgarian: "Добавете ключови думи, за да читателите да намират по-лесно творбите Ви."
	},
	'UploadMore': {
		british: "Upload your book in pdf format.",
		bulgarian: "Прикачете книгата Ви в pdf формат"
	},
	'Add': {
		british: "Add",
		bulgarian: "Добавяне"
	},
	'Publish': {
		british: "Publish",
		bulgarian: "Публикуване"
	},
	'Agreement': {
		british: 'I am the author of this book or I have distribution agreement.',
		bulgarian: 'Аз съм авторът на тази книга или имам споразумение за разпространение.'
	},
	//myBooks page:
	'Hello': {
		british: "Hello, ",
		bulgarian: "Здравейте, "
	},
	'PublishedBooks': {
		british: "Here are the books you have published:",
		bulgarian: "Това са книгите, които сте публикували:"
	},
	'NoPublishedBooks': {
		british: "You have not published any books yet.",
		bulgarian: "Не сте публикували никакви книги."
	},
	'NoBoughtBooks': {
		british: "You have not bought any books yet.",
		bulgarian: "Не сте закупили никакви книги."
	},
	'BoughtBooks': {
		british: "Here are the books you have bought",
		bulgarian: "Това са книгите, които сте закупили"
	},
	//reading page:
	'AccessDenied': {
		british: "Access denied",
		bulgarian: "Забранен достъп"
	},
	'Security': {
		british: "for security reasons, you can not access this page.",
		bulgarian: "от съображения за сигурност нямате достъп до тази страница."
	},
	// cancel page:
	'NotCompleted': {
		british: "Payment not completed !",
		bulgarian: "Плащането не беше завършено !"
	},
	'Cancelled' : {
		british: "We were unable to process your online payment. Please resubmit your payment. Thank you.",
		bulgarian: "Не успяхме да обработим вашето онлайн плащане. Моля, изпратете отново плащането си. Благодарим Ви."
	}, 
	'TryAgain' : {
		british: 'Try again',
		bulgarian: 'Опитайте отново'
	}

});

export const Text = translator.Text;