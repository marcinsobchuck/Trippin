import styled from 'styled-components';

import { ToastContainer } from 'react-toastify';

import { Colors } from 'src/enums/colors.enum';

export const PromiseToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    color: ${Colors.DarkerBlue};
  }

  .Toastify__progress-bar {
    background-color: ${Colors.LightBlue};
  }

  .Toastify__toast-icon > svg {
    fill: ${Colors.LightBlue};
  }
`;
