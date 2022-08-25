import React from "react";
import { StateProvider } from "./src/contexts/StateContext";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./src/stacks/AuthStack";

export default App = () => {
  return (
    <StateProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </StateProvider>
  );
};
