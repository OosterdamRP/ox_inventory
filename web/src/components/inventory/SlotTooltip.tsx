import { Slot } from '../../typings';
import { Fragment } from 'react';
import { Divider, Typography } from '@mui/material';
import { Items } from '../../store/items';
import { Locale } from '../../store/locale';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../../store';

const SlotTooltip: React.FC<{ item: Slot }> = ({ item }) => {
  const additionalMetadata = useAppSelector((state) => state.inventory.additionalMetadata);

  return (
    <div className="tooltip-wrapper">
      <div className="tooltip-header-wrapper">
        <Typography fontSize={15}>
          {item.metadata?.label || (item.name && Items[item.name]?.label) || item.name}
        </Typography>
        <Typography fontSize={15}>{item.metadata?.type}</Typography>
      </div>
      <Divider />
      {(item.metadata?.description || (item.name && Items[item.name]?.description)) && (
        <Typography fontSize={14}>
          <ReactMarkdown className="tooltip-markdown">
            {item.metadata?.description || (item.name && Items[item.name]?.description)}
          </ReactMarkdown>
        </Typography>
      )}
      {item.durability !== undefined && (
        <Typography fontSize={14}>
          {Locale.ui_durability}: {item.durability}
        </Typography>
      )}
      {item.metadata?.ammo !== undefined && (
        <Typography fontSize={14}>
          {Locale.ui_ammo}: {item.metadata.ammo}
        </Typography>
      )}
      {item.metadata?.serial && (
        <Typography fontSize={14}>
          {Locale.ui_serial}: {item.metadata.serial}
        </Typography>
      )}
      {item.metadata?.components && item.metadata?.components[0] && (
        <Typography fontSize={14}>
          {Locale.ui_components}:{' '}
          {(item.metadata?.components).map((component: string, index: number, array: []) =>
            index + 1 === array.length ? Items[component]?.label : Items[component]?.label + ', '
          )}
        </Typography>
      )}
      {item.metadata?.weapontint && (
        <Typography fontSize={14}>
          {Locale.ui_tint}: {item.metadata.weapontint}
        </Typography>
      )}
      {Object.keys(additionalMetadata).map((data: string, index: number) => (
        <Fragment key={`metadata-${index}`}>
          {item.metadata && item.metadata[data] && (
            <Typography fontSize={14}>
              {additionalMetadata[data]}: {item.metadata[data]}
            </Typography>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default SlotTooltip;
