import React, { useEffect, useState } from 'react'
import { addListNumber } from '../../../api/helperFunctions'
import { CheckList } from './CheckList'

const CheckListHolder = ({ checkListNumber, checkedUser, checkLists }) => {


	const formatData = (arr) => {
		return arr?.map(({ question, answer, description }, i) => {
			return {
				number: addListNumber(i),
				question: question,
				answer: answer,
				description: description,
			}
		})
	}
	// console.log(checkedUser?.checklist?.['0'])
	// const [checkListId, setCheckListId] = useState()
	const [checkList, setCheckList] = useState()
	useEffect(() => {
		const checkRow = checkedUser?.checklist?.[`${checkListNumber}`]
		const checkListArr = []
		for (let index = 0; index < checkRow?.question?.question?.length; index++) {
			checkListArr.push({
				question: checkRow?.question?.question[index]?.[`question${[index + 1]}`],
				answer: checkRow?.answer?.answer[index]?.[`answer${[index + 1]}`],
				description: checkRow?.answer?.answer[index]?.[`description${[index + 1]}`]
			})
			// console.log(checkRow?.question?.question[index]);
		}
		// setCheckListId(checkedUser?.checklist?.[`${checkListNumber}`]?.id)
		setCheckList(formatData(checkListArr))
		// checkedUser?.checklist?.['0'].
	}, [checkedUser, checkListNumber])


	return (
		<CheckList checkedUser={checkedUser} checkListId={checkListNumber} checkList={checkList} checkLists={checkLists} />
	)
}

export default CheckListHolder