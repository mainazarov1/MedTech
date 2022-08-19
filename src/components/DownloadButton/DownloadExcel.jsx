import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ButtonApp } from '../ButtonApp/ButtonApp';
import IconDownload from '../../assets/icons/IconDownload';

const DownloadExcel = ({ apiData, fileName }) => {
	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	const exportToCSV = (apiData, fileName) => {
		const ws = XLSX.utils.json_to_sheet(apiData);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	return (
		// <ButtonApp handleClick={(e) => exportToCSV(apiData, fileName)}>Export</ButtonApp>
		<ButtonApp
			title='Скачать чек-лист'
			variant='outlined'
			endIcon={<IconDownload props='#68B7EC' />}
			style={{
				width: "fit-content",
				minWidth: 'fit-content',
				color: '#68B7EC'
			}}
			handleClick={(e) => exportToCSV(apiData, fileName)}
		/>
	);
}

export default DownloadExcel