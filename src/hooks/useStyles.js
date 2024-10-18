import { createTheme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    muiTextFieldInput: {
        width: '100%',
        border: '1px solid #dee2e6',
        borderRadius: '0.375rem',
        backgroundColor: '#ffffff',
        "& .MuiInput-underline:before": {
            borderBottom: '0'
        },
        "& .MuiInput-underline .MuiInputBase-input": {
            textAlign: 'center',
            paddingBottom: '0.375rem',
        },
    }
});