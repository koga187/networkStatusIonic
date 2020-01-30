import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins, PluginListenerHandle, NetworkStatus } from '@capacitor/core'

const { Network } = Plugins

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;

  async ngOnInit() {
    this.networkListener = Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.networkStatus = status;
    })

    this.networkStatus = await Network.getStatus();
  }

  ngOnDestroy() {
    this.networkListener.remove();
  }

  constructor() {}

}
