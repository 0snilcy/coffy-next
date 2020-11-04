import React from 'react'
import styles from './Input.module.scss'

export interface IInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<IInputProps> = ({ type = 'text', value = '' }) => {
	return (
		<input className={styles.Component} type={type} defaultValue={value} />
	)
}