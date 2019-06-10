import React, {Fragment} from 'react';
import {RGBColor} from '@colormap/core';
import {Typography, Grid} from '@material-ui/core';
import { createStyles, WithStyles, Theme, withStyles } from '@material-ui/core/styles';

import { ImageDataSource } from '../../stem-image/data';
import { Vec4 } from '../../stem-image/types';
import STEMImage from '../stem-image';
import Overlay from '../overlay';
import SelectionOverlay from '../selection-overlay';
import { IImage } from '../../types';

const styles = (theme: Theme) => createStyles({
  title: {
    margin: theme.spacing(4, 0, 2)
  }
});

interface Props extends WithStyles<typeof styles> {
  image: IImage;
  brightFieldSource: ImageDataSource;
  darkFieldSource: ImageDataSource;
  frameSource: ImageDataSource;
  colors: RGBColor[];
  selection: Vec4;
  onPixelClick?: (x: number, y: number) => void;
  onSelectionChange?: (selection: Vec4) => void;
}

const ImageView: React.FC<Props> = ({
  image, colors, onPixelClick, onSelectionChange, classes,
  brightFieldSource, darkFieldSource, frameSource, selection
}) => {
  return (
    <Fragment>
      <Typography variant="h4" className={classes.title}>
        {image.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h5" className={classes.title}>
            Fields
          </Typography>
          <Overlay>
            <STEMImage source={brightFieldSource} colors={colors} onPixelClick={onPixelClick}/>
            <SelectionOverlay source={brightFieldSource} selection={selection} onSelectionChange={onSelectionChange}/>
          </Overlay>
          <Overlay>
            <STEMImage source={darkFieldSource} colors={colors} onPixelClick={onPixelClick}/>
            <SelectionOverlay source={brightFieldSource} selection={selection} onSelectionChange={onSelectionChange}/>
          </Overlay>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" className={classes.title}>
            Frames
          </Typography>
          <STEMImage source={frameSource} colors={colors}/>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default withStyles(styles)(ImageView);
