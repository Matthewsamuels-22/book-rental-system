import PropTypes from "prop-types";
import { forwardRef, useContext, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { StudentContext } from "../contexts/StudentContext";



function StudentAutocompleteRender(props, ref) {
	const { students } = useContext(StudentContext);
	const [studentId, setStudentId] = useState(props.defaultValue)

	return (
		<Autocomplete options={students} getOptionLabel={(option) => option.name} defaultValue={students.find(x => x.id === studentId)} disableClearable
			onChange={(event, value) => setStudentId(value.id)}
			renderOption={(properties, option) => (<Stack component="li" {...properties}>
				<Typography component='div' fontWeight='bold' variant="body2" marginRight='auto'>{option.name}</Typography>
				<Stack direction='row' useFlexGap spacing={2} sx={{ width: '100%' }}>
					<Typography component='div' variant="caption">{option.schoolId}</Typography>
					<Typography component='div' variant="caption">{option.gradeLevels.at(-1).class}</Typography>
				</Stack>
			</Stack>)}
			renderInput={(params) => (<TextField {...params} label={props.label} required={props.required ?? false} inputRef={ref} inputProps={{ ...params.inputProps, 'data-id': studentId }} />)} />
	)
}

export const StudentAutocomplete = forwardRef(StudentAutocompleteRender)

StudentAutocomplete.propTypes = {
	label: PropTypes.string,
	defaultValue: PropTypes.string,
	required: PropTypes.bool
}