import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  AsidePortal,
  Card,
  TabsMenu,
  SubjectCategoryPicker,
  ResearchSubjectPicker,
} from '../components';

export const HomePage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div>
      <AsidePortal>
        <p>
          This is the homepage show some messages here perhaps - this was sent
          via the AsidePortal component
        </p>
        <Stack spacing={2}>
          <Button
            disableRipple
            variant='contained'
            component={RouterLink}
            to='/demo-form'
            endIcon={<ArrowForwardIcon />}
          >
            Simple search form
          </Button>
          <Button
            disableRipple
            variant='contained'
            component={RouterLink}
            to='/author-form'
            endIcon={<ArrowForwardIcon />}
          >
            Add publication
          </Button>
          <Button
            disableRipple
            variant='contained'
            component={RouterLink}
            to='/users'
            endIcon={<SearchIcon />}
          >
            Find persons
          </Button>
        </Stack>
      </AsidePortal>
      <TabsMenu />
      <Stack spacing={2}>
        <Card
          title='National subject category'
          variant='variant6'
          tooltipTitle='Publication'
          tooltipBody='Publications help body text tooltip'
        >
          <SubjectCategoryPicker
            onSelect={(id) =>
              enqueueSnackbar(`Subject ${id} was successfully added`, {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
              })
            }
          />
        </Card>
        <Card
          title='Variant1'
          variant='variant1'
          tooltipTitle='Publication'
          tooltipBody='Publications help body text tooltip'
        >
          <ResearchSubjectPicker />
        </Card>
        <Card
          title='Variant2'
          variant='variant2'
          tooltipTitle='Publication'
          tooltipBody='Publications help body text tooltip'
        >
          {t('Welcome')}
        </Card>
        <Card
          title='Variant3'
          variant='variant3'
          tooltipTitle='Publication'
          tooltipBody='Publications help body text tooltip'
        >
          {t('Welcome')}
        </Card>
        <Card
          title='Variant4'
          variant='variant4'
          tooltipTitle='Publication'
          tooltipBody='Publications help body text tooltip'
        >
          {t('Welcome')}
        </Card>
        <Card
          title='Variant5'
          variant='variant5'
          tooltipTitle='Publication'
          tooltipBody='Publications help body text tooltip'
        >
          {t('Welcome')}
        </Card>
        <Card
          title='Variant6'
          variant='variant6'
          tooltipTitle='Publication'
          tooltipBody='Publications help body text tooltip'
        >
          {t('Welcome')}
        </Card>
      </Stack>
    </div>
  );
};
