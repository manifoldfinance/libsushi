import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { chains } from 'eth-chains'
import { providers, utils } from 'ethers'
import React, { ReactNode, useContext, useEffect, useState } from 'react'


declare let window: {
  ethereum?: any
  web3?: any
}

interface EthereumContext {
  provider?: JsonRpcProvider
  signer?: JsonRpcSigner
  account?: string
  ensName?: string
  chainId?: number
  chainName?: string
  connect?: () => Promise<void>
}

const EthereumContext = React.createContext<EthereumContext>({})

interface Props {
  children: ReactNode
}

/** 
    @function normalizeChecksum
    @summary: normalize valid address it to Ethereum checksum {@EIP:55}
    @note: accounts are converted to lowercase -> getAddress
      because different chains (like RSK) may have other checksums
*/

export const EthereumProvider = ({ children }: Props) => {
  const [provider, setProvider] = useState<JsonRpcProvider>()
  const [chainId, setChainId] = useState<number>()
  const [chainName, setChainName] = useState<string>()
  const [account, setAccount] = useState<string>()
  const [signer, setSigner] = useState<JsonRpcSigner>()

  useEffect(() => {
    const newChainName = chains.get(chainId ?? '')?.name ?? `Network with chainId ${chainId}`
    if (newChainName) setChainName(newChainName)
  }, [chainId])

  useEffect(() => {
    setSigner(provider?.getSigner(account))
  }, [account])

  const updateAccount = (newAccount?: string) => {
    if (newAccount) {
      setAccount(utils.getAddress(newAccount.toLowerCase()))
    }
  }

  const connect = async () => {
    const [connectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    updateAccount(connectedAccount)
  }

  useEffect(() => {
    const updateProvider = async (newProvider: providers.JsonRpcProvider) => {
      const { chainId: newChainId } = await newProvider.getNetwork()
      const newAccount = await getConnectedAccount(newProvider)
      setProvider(newProvider)
      setChainId(newChainId)
      updateAccount(newAccount)
    }

    const connectProvider = async () => {
      if (window.ethereum) {
              // Use a default provider with a free Infura key if web3 is not available
          const newProvider = new providers.InfuraProvider('mainnet', `${'125a1545497b4194'}${'923d92251bb85ddd'}`)

          // Check that the provider is available (and not rate-limited) by sending a dummy request
          await newProvider.getCode('0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', 'latest')
          await updateProvider(newProvider)
          console.log('Using SushiGuard Provider')
      } else {
        try {
        const provider = new providers.Web3Provider(window.ethereum, 'any')
        await updateProvider(provider)
        console.log('Using injected "window.ethereum" provider')
        } catch {
          console.log('No web3 provider available')
        }
      }

      window.ethereum?.on('accountsChanged', (accounts: string[]) => {
        console.log('accounts changed to', accounts)
        updateAccount(accounts[0])
      })

      window.ethereum?.on('chainChanged', (chainIdHex: string) => {
        const chainIdDec = Number.parseInt(chainIdHex, 16)
        console.log('chain changed to', chainIdDec)
        setChainId(chainIdDec)
      })
    }

    connectProvider()
  }, [])

  return (
    <EthereumContext.Provider value={{ provider, chainId, chainName, account, signer, connect }}>
      {children}
    </EthereumContext.Provider>
  )
}

const getConnectedAccount = async (provider: providers.JsonRpcProvider) => {
  try {
    return await provider?.getSigner().getAddress()
  } catch (e) {
    return undefined
  }
}

export const useEthereum = () => {
  return useContext(EthereumContext)
}
