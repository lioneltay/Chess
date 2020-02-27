import { keyframes } from 'styled-components'

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1)
  }

  12.5% {
    opacity: 0;
    transform: scale(1.5)
  }

  25% {
    opacity: 0;
    transform: scale(1.5)
  }

  25% {
    opacity: 0;
    transform: scale(1)
  }

  100% {
    opacity: 0;
    transform: scale(1)
  }
`
