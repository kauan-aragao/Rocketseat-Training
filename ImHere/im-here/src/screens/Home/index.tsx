import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { Participant } from '../../components/Participant'
import { useState } from 'react'


export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [newParticipant, setNewParticipant] = useState<string>("")

  function handleParticipantAdd() {
    if(participants.includes(newParticipant)) {
      return Alert.alert("Participante Já Existe", "Já existe um participante com esse nome na lista")
    }

    setParticipants(prevState => [...prevState, newParticipant])
    setNewParticipant("")
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Deseja remover o participante ${name} ? `, [
      {
        text: "Sim",
        onPress:() => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: "Não",
        style: 'cancel'
      }
    ])

  }

  return (
    <View style={styles.container}>
    <Text style={styles.eventName}>
      Nome do evento
    </Text>

    <Text style={styles.eventDate}>
      Sexta, 4 de Novembro de 2022.
    </Text>

    <View style={styles.form}>
      <TextInput 
        style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor="#6B6B6B"
        onChangeText={name => setNewParticipant(name)}
        value={newParticipant}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
        <Text style={styles.buttonText}>
          +
        </Text>
      </TouchableOpacity>
    </View>

    <FlatList 
      keyExtractor={item => item}
      data={participants}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <Participant name={item} onRemove={() => handleParticipantRemove(item)}/>}
      ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}>
          Ninguém chegou no evento ainda.
        </Text>
      )}
    />

  </View>
  )
}