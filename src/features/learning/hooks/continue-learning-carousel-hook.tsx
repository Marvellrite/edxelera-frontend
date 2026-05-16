import { useCallback, useState, useEffect } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

export const useDotButtons = (emblApi: EmblaCarouselType) => {
   const [selectedIndex, setSelectedIndex] = useState(() => emblApi?.selectedScrollSnap() ?? 0);
   const [scrollSnaps, setScrollSnaps] = useState<number[]>(() => emblApi?.scrollSnapList() ?? []);

   const onSelect = useCallback(() => {
      if (!emblApi) return;
      setSelectedIndex(emblApi.selectedScrollSnap());
   }, [emblApi]);

   const onInit = useCallback(() => {
      if (!emblApi) return;
      setScrollSnaps(emblApi.scrollSnapList());
   }, [emblApi]);

   useEffect(() => {
      if (!emblApi) return;
      emblApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);

   }, [emblApi, onInit, onSelect]);

   const scrollTo = useCallback(
      (index: number) => {
         if (!emblApi) return;
         emblApi.scrollTo(index);
      },
      [emblApi],
   );

   return { selectedIndex, scrollSnaps, scrollTo };
};
