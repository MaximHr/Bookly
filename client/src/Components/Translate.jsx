import {createTranslations} from 'react-text-translator';

//текстът на български и английски
export const translator = createTranslations({
	//stripeAuth page:
	'stripeAuthInfo': {
		bulgarian: 'Поздравления, упсешно се регистрирахте в Bookly. Но, ако искате да приемате плащания и да продавате книгите си трябва да си създадете stripe акаунт. Ако ще публикувате творбите си безплатно или само ще четете може да пропуснете тази стъпка. Комисионната на Bookly е 7% за всяка продадена книга. Чрез създаване на stripe акаунт, Вие приемате техните ',
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
		bulgarian: 'Bookly е уебсайт, който Ви позволява да разглеждате и купувате книги от любители, а и от професионални писатели. Тук можете да споделите собствената си литературна творба с общност от читатели и да получите обратна връзка чрез коментари. Също така можете да прочетете най-новите, най-високо оценените и най-популярните книги на платформата или да потърсите конкретна творба. Независимо дали сте писател, който иска да се популяризира и да подобри уменията си , или читател, който търси нови истории, на които да се наслади, това приложение е точно за Вас.'
	},
	'CreateAcc': {
		british: "Create an account",
		bulgarian: "Създаване на акаунт"
	},
	//navbar
	'SignIn': {
		british: "Sign In",
		bulgarian: "Влезни"
	},
	'SignUp': {
		british: "Sign Up",
		bulgarian: "Регистрирай се"
	},
	'Profile': {
		british: "My Profile",
		bulgarian: "Моят Профил"
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
	}
});

export const Text = translator.Text;