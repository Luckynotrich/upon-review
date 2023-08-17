<CheckBox
                    {...field}
                    id={prop.id}
                    text={prop.value}
                    toggleProp={toggleProp}
                    key={prop.id}
                    prefArr={prop[i]}
                    onClick={()=>  isItemSelected(id)}
                  />
                )}
                onChange={() =>{
                  toggleProp(id)
              }}
              />