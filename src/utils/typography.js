import Typography from 'typography';
import twinPeaksTheme from 'typography-theme-twin-peaks';

twinPeaksTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    a: {
        backgroundImage: '',
        color: 'inherit',
    },
});

const typography = new Typography(twinPeaksTheme);

export default typography;
export const rhythm = typography.rhythm;
