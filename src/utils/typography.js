import Typography from 'typography';
import twinPeaksTheme from 'typography-theme-twin-peaks';

twinPeaksTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    a: {
        backgroundImage: '',
        color: 'black',
        background_color: 'inherit',
        textShadow: ''
    },
    'a:hover': {
        color: '#007ac1'
    }
});

const typography = new Typography(twinPeaksTheme);

export default typography;
export const rhythm = typography.rhythm;
