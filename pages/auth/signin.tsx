import { Button, Label, Container, Form } from 'components'
import { observer } from 'mobx-react-lite'
import { IApiAuth } from 'services/api/model'
import { IUserAuth } from 'services/user/model'
import { useContext, useState } from 'react'
import { StoreContext } from 'store'
import ApiService from 'services/api'

const SignIn = observer(() => {
	const [email, setEmail] = useState<string>('0.snilcy@gmail.com')
	const [password, setPassword] = useState<string>('123456')
	const [inValid, setValid] = useState<boolean>(!(email && password))

	const store = useContext(StoreContext)

	return (
		<Container>
			<Form
				onSubmit={async (evt) => {
					evt.preventDefault()
					const user: IUserAuth = { email, password }
					const response = await ApiService.fetcher<IApiAuth>(
						'/api/auth/signin',
						user
					)

					if (response.data) {
						store.setTokens(response.data)
					}
				}}>
				<Label
					title='Почта'
					input={{
						name: 'email',
						value: email,
						autoComplete: 'username',
						onInput: ({ target }) => {
							setEmail(target.value)
							setValid(!(target.value && password))
						},
					}}
				/>
				<Label
					title='Пароль'
					input={{
						type: 'password',
						name: 'password',
						value: password,
						autoComplete: 'current-password',
						onInput: ({ target }) => {
							setPassword(target.value)
							setValid(!(email && target.value))
						},
					}}
				/>
				<Button
					type='submit'
					value='Авторизоваться'
					disabled={inValid}
				/>
			</Form>
		</Container>
	)
})

export default SignIn
